import stripe from "@/utils/loadStripe"

export const GET = async (request: Request) => {
    const products = await stripe.products.list({
        expand: ["data.default_price"]
    });
    return Response.json(products)
}