import stripe from "@/utils/loadStripe"

export const POST = async (req: Request) => {
    const checkoutSession = await stripe.checkout.sessions.create({
        line_items:[{
            price: "price_1SgbFd52oLOdm23qioBNxd6M",
            quantity: 1
        }],
        mode: "subscription",
        ui_mode: "custom",
    })
    return Response.json(checkoutSession);
}