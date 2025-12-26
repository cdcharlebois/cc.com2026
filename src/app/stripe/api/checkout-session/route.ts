import stripe from "@/utils/loadStripe"

export const POST = async (req: Request) => {
    const { cart, return_url, ui_mode } = await req.json();
    const checkoutSession = await stripe.checkout.sessions.create({
        line_items: cart,
        mode: "subscription",
        ui_mode,
        return_url,
        // permissions: {
        //     update_line_items: "server_only" // private preview
        // }
        // ui_mode: "custom",
        // success_url
    })
    return Response.json(checkoutSession);
}