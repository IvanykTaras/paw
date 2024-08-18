import { Card, Form, InputGroup } from "react-bootstrap"
import { CustomCard } from "./CustomCard"
import { MarginElements } from "./MarginElements"

export const CardSample: React.FC = ()=>{
    return <>
    <div style={{ width: '18rem' }}
          className="mb-2">
    <CustomCard
        >
        <Card.Header>Header</Card.Header>
        <Card.Body>
        <Card.Title> Card Title </Card.Title>
        <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
        </Card.Text>
        <MarginElements>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={"Name of project"}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Description</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={"Name of project"}
                        />
                    </InputGroup>
                </MarginElements>
        </Card.Body>
    </CustomCard>
    </div>
    </>
}