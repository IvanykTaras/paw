import { Button, Card, Form } from "react-bootstrap"
import { CustomCard } from "./CustomCard"
import { IPropsChildren } from "../../interfaces/IPropsChildren"

interface Props extends IPropsChildren{
    title: string;
    buttonFunc:()=>void;
}

export const CreateForm: React.FC<Props> = ({title,buttonFunc,children})=>{
    return <><div style={{width: "30rem", margin: "5rem auto"}}>
        <CustomCard>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <Form>
                    {children}
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button onClick={ ()=> buttonFunc()} variant="success" style={{width: "100%"}}>create</Button>
            </Card.Footer>
        </CustomCard>
    </div></>
}