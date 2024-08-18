import { Button, Card, Form, Modal } from "react-bootstrap"
import { CustomCard } from "../layouts/CustomCard"
import { ProjectAPI } from "../../services/ProjectAPI"
import { Project } from "../../models/Project"
import { useState } from "react"
import { Loadding } from "../layouts/Loadding"
import { IProject } from "../../interfaces/IProject"
import { CreateForm } from "../layouts/CreateForm"
import { MarginElements } from "../layouts/MarginElements"
import { TaskAPI } from "../../services/TaskAPI"
import { useFormik } from "formik"
import { ITask } from "../../interfaces/ITask"
import { Priority } from "../../enums/Priority"
import { Status } from "../../enums/Status"
import { useNavigate, useParams } from "react-router-dom"

export const CreateTask: React.FC = ()=>{
    
    const [loadding, setLoadding] = useState<boolean>(false);
    const params = useParams()
    const navigate = useNavigate();

    const formik = useFormik<ITask>({
        initialValues: {
            name: '',
            description: '',
            priority: Priority.Low,
            functionalityId: params.functionalityId as string,
            estimatedTime: new Date,
            status: Status.Todo
        },
        onSubmit: (values)=>{}
    });


    const create = async ()=>{
        setLoadding(true);
        await TaskAPI.create(formik.values)
        setLoadding(false);
    };

    const submit = async ()=> {
        formik.handleSubmit()
        await create();
        navigate(`/task/${params.functionalityId}`);

    }

    return loadding ? <Loadding/> : <>
        <CreateForm title="Create Task" buttonFunc={submit}>
            <MarginElements >
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
                    <Form.Label>Functionality Id</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.functionalityId}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Label>estimated Time</Form.Label>
                    <Form.Control
                        id="estimatedTime"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.estimatedTime.toString()}
                        />
                </Form.Group>


            </MarginElements>
        </CreateForm>





      
    </>
}


