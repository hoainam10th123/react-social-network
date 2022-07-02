import { Card } from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCircle)

export default function Post() {
    return (
        <Card className="border border-primary">
            <Card.Header className="d-flex align-items-center">
                <div style={{ position: 'relative', marginRight: 10 }}>
                    <img className="rounded-circle" height={60} src="/assets/user.png" alt="" />
                    <span className="online lb-pos"><FontAwesomeIcon icon={faCircle} /></span>
                </div>
                <div>
                    <div className="text-primary">Nguyen Hoai Nam</div>
                    <div className="text-muted">1 second ago</div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}