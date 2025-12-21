import stripe from "@/utils/loadStripe"

export const POST = async (req: Request) => {
    const { cart } = await req.json()
    const invoicePreview = await stripe.invoices.createPreview({
        subscription_details: {
            items: cart
        }
    })
    return Response.json({invoicePreview});
}    
