import stripe from "@/utils/loadStripe"
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    // console.log(JSON.stringify(req, null, 2))
    const { customer, return_url } = await req.json();
    const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url
    })
    return Response.json(session);
}