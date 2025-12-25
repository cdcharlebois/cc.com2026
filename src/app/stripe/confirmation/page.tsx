"use client";

import { get, post } from "@/utils/api";
import { use, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Stripe from "stripe";

export default function Page({ searchParams }: {
  searchParams: Promise<{ [key: string]: string }>
}
) {

  const { payment_intent, sub } = use(searchParams)
  const [pi, setPi] = useState<Stripe.PaymentIntent>();
  const [customerId, setCustomerId] = useState<String>();
  const [billingPortalLink, setBillingPortalLink] = useState<String>();
  useEffect(() => {
    (async () => {
      if (sub) {
        // fetch the sub details: customer
        // setSubscription(await get({url: `/stripe/api/subscri)ptions/${sub}`}));
      }
      if (payment_intent) {
        const paymentIntentObj : Stripe.PaymentIntent = await post({
          url: "/stripe/api/payment-intents/verify",
          body: JSON.stringify({ payment_intent }),
        })
        setPi(paymentIntentObj);
        if (sub){
          setCustomerId(paymentIntentObj.customer as string)
        }
        const session : Stripe.BillingPortal.Session = await post({
          url: "/stripe/api/billing-portal-sessions",
          body: JSON.stringify({
            customer: paymentIntentObj.customer as string,
            return_url: window.location.href
          })
        })
        setBillingPortalLink(session.url)
      }
    })();
  }, [payment_intent]);

  return (
    <>
      <h1>Thank you</h1>
      <p>Your payment was successful</p>
      <p>{payment_intent}</p>
      <p>{customerId}</p>
      <Alert variant="light">
        Your payment <code>{payment_intent}</code> was successful. Your customer id is <code>{customerId}</code>. You can view your customer portal here: <Button variant="link" href={billingPortalLink as string}>Go now</Button>
      </Alert>
      <pre>{JSON.stringify(pi, null, 2)}</pre>
    </>
  );
};
