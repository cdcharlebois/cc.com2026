"use client"

import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSessionCheckoutForm from "@/components/CheckoutSessionCheckoutForm";
import CodeWell from "@/components/CodeWell";
import ProductCard from "@/components/ProductCard";
import { post } from "@/utils/api";
import { createSubscription, invoicePreview, paymentElement } from "@/utils/codeSnippets";
import { formatPrice } from "@/utils/misc";
import { Elements, EmbeddedCheckout, EmbeddedCheckoutProvider, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react"
import { Alert, Button, Col, Row } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Stripe from "stripe";

export default () => {
    // const pathname = usePathname();
    const [products, setProducts] = useState<Stripe.Product[]>([]);
    const [cart, setCart] = useState<string[]>([])
    const [previewInvoice, setPreviewInvoice] = useState<Stripe.Invoice>()
    const [clientSecret, setClientSecret] = useState<string>();
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
        if (newCart.length === 0) {
            return;
        }
        const data = await post({
            url: "/stripe/api/invoice-preview",
            body: JSON.stringify({
                cart: newCart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                }))
            })
        });
        setPreviewInvoice(data.invoicePreview);
        const checkoutSession: Stripe.Checkout.Session = await post({
            url: "/stripe/api/checkout-session",
            body: JSON.stringify({
                cart: newCart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                })),
                return_url: window.location.origin + "/stripe/confirmation?sub=true",
                ui_mode: "embedded"
            })
        })
        console.log(checkoutSession);
        setClientSecret(checkoutSession.client_secret as string);
        await post({
            url: `/stripe/api/checkout-session/${checkoutSession.id}`,
            body: JSON.stringify({
                cart: newCart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                })),
            })
        })
    }


    return (
        <>
            <Alert variant="warning">
                <p>🚧 This page is under construction</p>
            </Alert>
            <h1>Susbcription Checkout (Embedded Checkout Session)</h1>
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
                    {clientSecret && <>
                        <EmbeddedCheckoutProvider
                            stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)}
                            options={{
                                clientSecret
                            }}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    </>}

                </Col>
            </Row>


        </>
    )

}