"use client";

import { Alert, Card, Col, Row } from "react-bootstrap";
import { IoArrowForward, IoHandRight } from "react-icons/io5";

export default () => {
    return <>
        <h1>Stripe</h1>
        <Alert variant="warning">
            <p>
                ⚠️ check back soon for more integration references here
            </p>
        </Alert>
        <Row>
            <Col sm={2} md={3}>
                <Card>
                    <Card.Body>
                        <Card.Title>Pricing Table</Card.Title>
                        <Card.Subtitle>The easiest way to display pricing information and link your customers directly into a hosted checkout flow</Card.Subtitle>
                        <Card.Link href="/stripe/pricing-table">Show <IoArrowForward/></Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {/* <ul>
            <p><li>Cart</li></p>
            <p><li>Pricing Table</li></p>
            <p><li>Hosted Checkout</li></p>
            <p><li>Embedded Checkout</li></p>
        </ul> */}

    </>
}