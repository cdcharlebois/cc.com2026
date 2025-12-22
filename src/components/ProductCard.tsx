import { formatPrice } from "@/utils/misc"
import { Button, Card, Col } from "react-bootstrap"
import Stripe from "stripe"

interface IProductCardProps {
    product: Stripe.Product,
    buttonText: string,
    onClick: (product: Stripe.Product) => void,
    width: number
}

export default (props: IProductCardProps) => {
    return <Col md={props.width}>
        <Card>
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Title>{formatPrice((props.product.default_price! as Stripe.Price).unit_amount!)}</Card.Title>
                <Button onClick={() => props.onClick(props.product)}>{props.buttonText}</Button>
            </Card.Body>

        </Card>
    </Col>
}