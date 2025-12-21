import React, { useEffect } from 'react';
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
