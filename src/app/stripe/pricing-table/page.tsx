"use client"

import { Alert } from "react-bootstrap"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";


export default () => {
    const code = `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table 
    pricing-table-id="prctbl_*****" 
    publishable-key="pk_test_*****">
</stripe-pricing-table>`
    return <>
        <h3>Pricing Table</h3>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <stripe-pricing-table pricing-table-id="prctbl_1SgbPi52oLOdm23q8AwS8juB"
            publishable-key="pk_test_51SgbE252oLOdm23qk9dhGAUov30hhgA60OVBifz5ii7iJG2NGiJoPhnCcJCx4wWvEIpWt8GB9EaSzBkpvdgdZkaN00mjX1KJsx">
        </stripe-pricing-table>

        <Alert variant="light" style={{ marginTop: 12 }}>
            This pricing table is configured in the Stripe dashboard and then 
            included on the page as embedded HTML. Clicking the subscribe button 
            above will launch a new hosted Checkout session where the customer 
            can complete the purchase and begin a new subscription.
        </Alert>

        <Alert variant="info">
            <h3>Client code</h3>
            <SyntaxHighlighter language="xml" style={atomOneDark}>
                {code}
            </SyntaxHighlighter>
        </Alert>

    </>
}