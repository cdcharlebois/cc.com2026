import { IBlogHeader } from "@/app/api/v1/blog/getPosts/route"
import { Button, Card, Col, Ratio } from "react-bootstrap"
import { IoOpen, IoOpenOutline } from "react-icons/io5"

export default (props: { post: IBlogHeader }) => {
    return <Col xs={12} sm={6} md={4}>
        <Card style={{marginBottom: 12}}>
            <Card.Img variant="top" src={props.post.imageUrl as string} />
            <Card.Body>
                <Card.Title>{props.post.title}</Card.Title>
                <Card.Subtitle>{new Date(props.post.date).toDateString()}</Card.Subtitle>
                <Card.Link href={props.post.url} target="_blank">Read More <IoOpenOutline /></Card.Link>
            </Card.Body>
        </Card>
    </Col>

}