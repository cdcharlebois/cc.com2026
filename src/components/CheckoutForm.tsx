import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from "react-bootstrap"

interface ICheckoutFormProps {
    submitButtonText: string,
    submitButtonActive: boolean,
    paymentIntentGetter: () => Promise<string>, // return the client secret
    returnUrl: string
}

export default (props: ICheckoutFormProps) => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmitPayment = async () => {
        // event.preventDefault();
        if (!elements || !stripe) {
            return null;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }
        const clientSecret = await props.paymentIntentGetter();
        console.log({ clientSecret })
        const { error: paymentError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: props.returnUrl
            }
        })
        // todo: error handling
    }

    return <>
        <PaymentElement />
        <div className="d-grid mt-2">
            <Button disabled={!props.submitButtonActive} onClick={handleSubmitPayment}>{props.submitButtonText}</Button>
        </div>

    </>
}