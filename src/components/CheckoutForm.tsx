"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

interface ICheckoutFormProps {
  submitButtonText: string;
  submitButtonActive: boolean;
  paymentIntentGetter: () => Promise<{ clientSecret: string; amount: number }>; // return the client secret
  returnUrl: string;
}

export default (props: ICheckoutFormProps) => {
  const elements = useElements();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const handleSubmitPayment = async () => {
    // event.preventDefault();
    if (!elements || !stripe) {
      return null;
    }
    setLoading(true);
    try {
      const { clientSecret, amount } = await props.paymentIntentGetter();
      console.log("checkout form", { clientSecret, amount });
      elements.update({
        amount
      });
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error("Elements.submit failed...");
        return;
      }

      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: props.returnUrl,
        },
      });
      if (paymentError) {
        throw new Error("Payment failed");
      }
      // todo: error handling
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PaymentElement />
      <div className="d-grid mt-2">
        <Button
          disabled={!props.submitButtonActive}
          onClick={handleSubmitPayment}
        >
          {loading ? <Spinner /> : props.submitButtonText}
        </Button>
      </div>
    </>
  );
};
