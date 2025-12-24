import stripe from "@/utils/loadStripe";

export const POST = async (req: Request) => {
  const { payment_intent } = await req.json();
  const pi = await stripe.paymentIntents.retrieve(payment_intent);
  return Response.json(pi);
};
