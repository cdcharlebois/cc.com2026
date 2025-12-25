"use client"

import { post } from "@/utils/api";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoArrowForward } from "react-icons/io5";
import Stripe from "stripe";

export default () => {
    const [customerId, setCustomerId] = useState("");

    const handlePress = async () => {
        const session: Stripe.BillingPortal.Session = await post({
            url: "/stripe/api/billing-portal-sessions",
            body: JSON.stringify({
                customer: customerId, 
                return_url: window.location.origin + "/stripe"
            })
        })
        window.location.href = session.url;
    }

    return <>
        <Form>
            <Form.Control type="text" placeholder="cus_*****" value={customerId} onChange={(e) => setCustomerId(e.target.value)}/>
            <Button variant="link" onClick={handlePress}>Go now <IoArrowForward/></Button>
        </Form>
    </>
}