import stripe from "@/utils/loadStripe"

export const GET = async (request: Request) => {
    const products = await stripe.products.list();
    return Response.json(products)
}