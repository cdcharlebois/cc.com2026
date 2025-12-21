"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { Alert, Button, Col, Row } from "react-bootstrap";
import Stripe from "stripe";

const formatPrice = (amount: number) => `$ ${(amount / 100).toFixed(2)}`

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
        const res = await fetch("/stripe/api/invoice-preview", {
            method: "POST",
            body: JSON.stringify({
                cart: newCart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                }))
            }),
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        setPreviewInvoice(data.invoicePreview);
        // })()
    }

    const getPaymentIntent = async () => {
        const res = await fetch("/stripe/api/subscriptions", {
            method: "POST",
            body: JSON.stringify({
                cart: cart.map(priceId => ({
                    price: priceId,
                    quantity: 1
                }))
            }),
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        return data.clientSecret || "";
    }

    return (
        <>
            <h1>Susbcription Checkout</h1>
            {products.map(p => <div key={p.id}>{p.id} - {p.name} - {p.default_price?.toString() || ""} <Button onClick={() => handleAddToCart(p.default_price?.toString() || "")}>Add to cart</Button></div>)}

            <Row>
                <Col md={4}>
                    <h2>Cart</h2>
                    {previewInvoice && <Alert variant="light">
                        <div>Total: {formatPrice(previewInvoice?.total || 0)}</div>
                        {previewInvoice.lines.data.map(line => <div key={line.id}>
                            {line.description} - {line.amount}
                        </div>)}
                    </Alert>}
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
                        <CheckoutForm
                            returnUrl="http://localhost:3000/stripe/subscription-checkout"
                            submitButtonText={`Subscribe for ${formatPrice(previewInvoice?.total || 0)}`}
                            paymentIntentGetter={getPaymentIntent}
                        />
                    </Elements>
                </Col>
            </Row>



        </>
    )

}