"use client"

import CheckoutForm from "@/components/CheckoutForm";
import ProductCard from "@/components/ProductCard";
import { post } from "@/utils/api";
import { createSubscription, invoicePreview, paymentElement } from "@/utils/codeSnippets";
import { formatPrice } from "@/utils/misc";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react"
import { Alert, Button, Col, Row } from "react-bootstrap";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Stripe from "stripe";

export default () => {
    // const pathname = usePathname();
    const [products, setProducts] = useState<Stripe.Product[]>([]);
    const [cart, setCart] = useState<string[]>([])
    const [previewInvoice, setPreviewInvoice] = useState<Stripe.Invoice>()
    useEffect(() => {
        (async () => {
            const res = await fetch("/stripe/api/products");
            const data = await res.json()
            console.log({ data })
            setProducts(data.data)
        })()
    }, [])

    const handleAddToCart = async (id: string) => {
        const newCart = [...cart, id];
        setCart(newCart);

        // (async () => {
        if (newCart.length === 0) {
            return;
        }
        const data = await post({
            url:"/stripe/api/invoice-preview",
            body:JSON.stringify({
                cart: newCart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                }))
            })
        });
        console.log(data);
        setPreviewInvoice(data.invoicePreview);
        // })()
    }

    const getPaymentIntent = async () => {
        const data = await post({
            url: "/stripe/api/subscriptions",
            body: JSON.stringify({
                cart: cart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                }))
            })
        });
        console.log(data);
        return data.clientSecret || "";
    }
    return (
        <>
            <h1>Susbcription Checkout</h1>
            <Row>
                {products.map(p => <ProductCard
                    key={p.id}
                    product={p}
                    buttonText="Add to Cart"
                    onClick={(p) => handleAddToCart((p.default_price! as Stripe.Price).id as string)}
                    width={3}
                />)}
            </Row>
            <Row>
                <Col md={4}>
                    <h2>Cart</h2>
                    <Alert variant="light">
                        {previewInvoice ? <>
                            <div>Total: {formatPrice(previewInvoice?.total || 0)}</div>
                            {previewInvoice.lines.data.map(line => <div key={line.id}>
                                {line.description} - {line.amount}
                            </div>)}
                        </> : <div>Your cart is empty</div>}
                    </Alert>
                </Col>
                <Col md={8}>
                    <h2>Checkout</h2>
                    <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)} options={{
                        mode: 'subscription',
                        amount: 50,
                        currency: 'usd',
                        appearance: {
                            theme: "night"
                        }
                    }}>
                        {typeof window != "undefined" && <CheckoutForm
                            returnUrl={window.location.origin + "/stripe/confirmation"}
                            submitButtonText={`Subscribe for ${formatPrice(previewInvoice?.total || 0)}`}
                            submitButtonActive={previewInvoice ? previewInvoice.total > 0 : false}
                            paymentIntentGetter={getPaymentIntent}
                        />}
                        
                    </Elements>
                </Col>
            </Row>
            <Alert variant="success">
                <h2>Invoice Preview</h2>
                <div>
                    The "Cart" here is shown as a result of generating an invoice preview when a new item is added to the cart
                </div>
                <SyntaxHighlighter language="typescript" style={oneDark}>
                    {invoicePreview}
                </SyntaxHighlighter>
            </Alert>

            <Alert variant="info">
                <h2>Payment Element</h2>
                <div>The payment element is loaded here in a deferred configuration, with intial values provided for rendering but then ignored. Clicking on the submit button triggers a call to the server to create the subscription and receive the <code>client_secret</code> for the payment intent tied to the first invoice.</div>
                <SyntaxHighlighter language="tsx" style={oneDark}>
                    {paymentElement}
                </SyntaxHighlighter>
            </Alert>

            <Alert variant="success">
                <h2>Create Subscription</h2>
                <div>
                    Create a customer (since we need one to create the subscription) and the create the subscription in a <code>default_incomplete</code> status. Expand the latest invoice to get the confirmation secret and return it to the client for confirmation in the payment element.
                </div>
                <SyntaxHighlighter language="typescript" style={oneDark}>
                    {createSubscription}
                </SyntaxHighlighter>
            </Alert>



        </>
    )

}