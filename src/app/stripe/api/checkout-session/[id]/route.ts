import stripe from "@/utils/loadStripe";

export const POST = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> }) => {
    const { cart } = await req.json();
    const { id } = await params
    const cs = await stripe.checkout.sessions.update(id, {
        line_items: cart
    })
    return Response.json(cs);
}