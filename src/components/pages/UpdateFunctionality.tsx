import { Button, Card, Form, InputGroup } from "react-bootstrap"
import { CustomCard } from "../layouts/CustomCard"
import { useContext, useEffect, useState } from "react"
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
import { Status } from "../../enums/Status"

export const UpdateFunctionality: React.FC = ()=>{
    
    const [loadding, setLoadding] = useState<boolean>(false);
    const userAuth = useContext(userAuthContext);
    const navigate = useNavigate();
    const params = useParams();

    const formik = useFormik<IFunctionality>({
        initialValues: {
            name: '',
            description: '',
            priority: Priority.Low,
            status: Status.Todo,
            projectId: params.projectId as string,
            userId: userAuth.values.userId
        },
        onSubmit: (values)=>{}
    });


    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
            FunctionalityAPI.accessToken = userAuth.values.accessToken;
            const f = await FunctionalityAPI.getById(params.functionalityId as string);
            formik.setValues({
                name: f.name,
                description: f.description,
                priority: f.priority,
                status: f.status,
                projectId: f.projectId,
                userId: f.userId
            })
            setLoadding(false)
        })()
    },[])


    const submit = async ()=> {
        setLoadding(true)
        await update();
        setLoadding(false)
    }

    const update = async ()=>{
        setLoadding(true);
        FunctionalityAPI.accessToken = userAuth.values.accessToken;
        await FunctionalityAPI.update(formik.values, params.functionalityId as string)
        setLoadding(false);
        navigate(`/functionality/${formik.values.projectId}`);
    };

    

    return loadding ? <Loadding/> : <>
        <CreateForm title="Edit Functionality" type="update" buttonFunc={submit}>
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
                    <Form.Label>Status</Form.Label>
                    <Form.Select 
                        id="status"
                        value={formik.values.status} 
                        onChange={formik.handleChange}>
                        { (Object.keys(Status) as Array<keyof typeof Status>).map((key,id) => {
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


