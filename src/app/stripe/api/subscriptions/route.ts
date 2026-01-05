import stripe from "@/utils/loadStripe";

export const POST = async (req: Request) => {
  const { cart } = await req.json();
  const customer = await stripe.customers.create({
    name: "Customer",
  });
  const susbcription = await stripe.subscriptions.create({
    customer: customer.id,
    items: cart,
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.confirmation_secret"],
  });

  return Response.json({
    susbcription,
    clientSecret:
      //@ts-ignore
      susbcription.latest_invoice!.confirmation_secret!.client_secret || null,
    //@ts-ignore
    amount: susbcription.latest_invoice!.amount_due,
  });
};
