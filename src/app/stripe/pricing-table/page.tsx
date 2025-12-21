"use client"

import StripePricingTable from "@/components/StripePricingTable";
import { Alert } from "react-bootstrap"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default () => {
    const code = `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table 
    pricing-table-id="prctbl_*****" 
    publishable-key="pk_test_*****">
</stripe-pricing-table>`
    const codeReact = `import React, { useEffect } from 'react';
interface IStripePricingTableProps {
    pricingTableId: string,
    publishableKey: string
}
const StripePricingTable = (props: IStripePricingTableProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': props.pricingTableId, // Replace with your actual ID
    'publishable-key': props.publishableKey, // Replace with your actual key
  });
};

export default StripePricingTable;
`
    return <>
        <h3>Pricing Table</h3>
        <StripePricingTable
            pricingTableId="prctbl_1SgbPi52oLOdm23q8AwS8juB"
            publishableKey="pk_test_51SgbE252oLOdm23qk9dhGAUov30hhgA60OVBifz5ii7iJG2NGiJoPhnCcJCx4wWvEIpWt8GB9EaSzBkpvdgdZkaN00mjX1KJsx"
        />

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
            or, if you're using react...
            <SyntaxHighlighter language="typescript" style={atomOneDark}>
                {codeReact}
            </SyntaxHighlighter>
        </Alert>

    </>
}