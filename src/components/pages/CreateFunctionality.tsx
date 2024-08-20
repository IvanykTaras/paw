import { Button, Card, Form, InputGroup } from "react-bootstrap"
import { CustomCard } from "../layouts/CustomCard"
import { useContext, useState } from "react"
import { Loadding } from "../layouts/Loadding"
import { IProject } from "../../interfaces/IProject"
import { CreateForm } from "../layouts/CreateForm"
import { useFormik } from "formik"
import { IFunctionality } from "../../interfaces/IFunctionality"
import { Priority } from "../../enums/Priority"
import { MarginElements } from "../layouts/MarginElements"
import { FunctionalityAPI } from "../../services/FunctionalityAPI"
import { useNavigate, useParams } from "react-router-dom"
import { userAuthContext } from "../../App"

export const CreateFunctionality: React.FC = ()=>{
    
    const [loadding, setLoadding] = useState<boolean>(false);
    const userAuth = useContext(userAuthContext);
    const navigate = useNavigate();
    const params = useParams();

    const formik = useFormik<IFunctionality>({
        initialValues: {
            name: '',
            description: '',
            priority: Priority.Low,
            projectId: params.projectId as string,
            userId: userAuth.values.userId
        },
        onSubmit: (values)=>{}
    });

    const create = async ()=>{
        setLoadding(true);
        FunctionalityAPI.accessToken = userAuth.values.accessToken;
        await FunctionalityAPI.create(formik.values)
        navigate(`/functionality/${params.projectId}`);
        setLoadding(false);
    };


    const submit = async ()=> {
        formik.handleSubmit()
        setLoadding(true)
        await create();
        setLoadding(false)
    }

    

    return loadding ? <Loadding/> : <>
        <CreateForm title="Create Functionality" type="create" buttonFunc={submit}>
            <MarginElements>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        id="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        id="description"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select 
                        id="priority"
                        value={formik.values.priority} 
                        onChange={formik.handleChange}>
                        { (Object.keys(Priority) as Array<keyof typeof Priority>).map((key,id) => {
                            return <option 
                                        key={id} 
                                        value={key.toLowerCase()}
                                        
                                        >
                                    {key}
                                    </option>;
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Id</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.projectId}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label>User Id</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userId}
                        />
                </Form.Group>
            </MarginElements>
        </CreateForm>
    </>
}


