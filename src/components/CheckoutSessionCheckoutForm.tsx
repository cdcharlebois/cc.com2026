// import { PaymentElement } from "@stripe/react-stripe-js";
import { useCheckout, PaymentElement } from "@stripe/react-stripe-js/checkout"
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export default () => {
    const checkoutState = useCheckout();
    const handleSubmit = async () => {
        if (checkoutState.type != "success"){
            return;
        }
        const { checkout } = checkoutState;
        const result = await checkout.confirm({
            returnUrl: window.location.origin + "/stripe/confirmation?sub=true"
        });
    }
    return <>
        {checkoutState.type === "loading" && <>
            <Spinner />
        </>}
        {checkoutState.type === 'error' && <>
            <Alert variant="error">Error: {checkoutState.error.message}</Alert>
        </>}
        {checkoutState.type === "success" && <>
            <PaymentElement />
            <Button onClick={handleSubmit}>Pay {checkoutState.checkout.total.total.amount}</Button>
        </>}
    </>
}