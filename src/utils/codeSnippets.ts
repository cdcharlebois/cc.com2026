export const invoicePreview = 
`export const POST = async (req: Request) => {
    const { cart } = await req.json()
    const invoicePreview = await stripe.invoices.createPreview({
        subscription_details: {
            items: cart
        }
    })
    return Response.json({invoicePreview});
}`

export const paymentElement = 
`<Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)} options={{
    mode: 'subscription',
    amount: 50,
    currency: 'usd',
    appearance: {
        theme: "night"
    }
}}>
    {typeof window != "undefined" && <CheckoutForm
        returnUrl={window.location.origin + "/stripe/confirmation"}
        submitButtonText={\`Subscribe for \${formatPrice(previewInvoice?.total || 0)}\`}
        submitButtonActive={previewInvoice ? previewInvoice.total > 0 : false}
        paymentIntentGetter={getPaymentIntent}
    />}
    
</Elements>`

export const createSubscription = 
`export const POST = async (req: Request) => {
    const { cart } = await req.json()
    const customer = await stripe.customers.create({
        name: "Customer"
    })
    const susbcription = await stripe.subscriptions.create({
        customer: customer.id,
        items: cart,
        payment_behavior: "default_incomplete",
        payment_settings: {
            save_default_payment_method: "on_subscription"
        },
        expand: ["latest_invoice.confirmation_secret"]
    })
    return Response.json({
        susbcription,
        clientSecret: susbcription
            .latest_invoice!
            //@ts-ignore
            .confirmation_secret!
            .client_secret || null
    })
}`