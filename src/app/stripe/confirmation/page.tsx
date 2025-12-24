"use client";

import { post } from "@/utils/api";
import { useParams, useSearchParams } from "next/navigation";
import { connection } from "next/server";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default async () => {
  await connection();
  const params = useSearchParams();
  const payment_intent = params.get("payment_intent");

  const [pi, setPi] = useState<Stripe.PaymentIntentsResource>();
  useEffect(() => {
    (async () => {
      if (payment_intent) {
        setPi(
          await post({
            url: "/stripe/api/payment-intents/verify",
            body: JSON.stringify({ payment_intent }),
          })
        );
      }
    })();
  }, [payment_intent]);

  return (
    <>
      <h1>Thank you</h1>
      <p>Your payment was successful</p>
      <p>{payment_intent}</p>
      <pre>{JSON.stringify(pi, null, 2)}</pre>
    </>
  );
};
