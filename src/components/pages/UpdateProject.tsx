import { Button, Card, Form } from "react-bootstrap"
import { CustomCard } from "../layouts/CustomCard"
import { ProjectAPI } from "../../services/ProjectAPI"
import { Project } from "../../models/Project"
import { useContext, useEffect, useState } from "react"
import { Loadding } from "../layouts/Loadding"
import { IProject } from "../../interfaces/IProject"
import { CreateForm } from "../layouts/CreateForm"
import { useNavigate, useParams } from "react-router-dom"
import { userAuthContext } from "../../App"
import { MarginElements } from "../layouts/MarginElements"

export const UpdateProject: React.FC = ()=>{
    const navigate = useNavigate();
    const params = useParams();
    const userAuth = useContext(userAuthContext)
    const [loadding, setLoadding] = useState<boolean>(false);
    const [formData, setFormData] = useState<IProject>({
        name: "",
        description: ""
    });

    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
            ProjectAPI.accessToken = userAuth.values.accessToken;
            const project = await ProjectAPI.getById(params.projectId as string);
            setFormData({
                name: project.name,
                description: project.description
            })
            setLoadding(false)
        })()
    },[])

    const update = async ()=>{
        setLoadding(true);
        ProjectAPI.accessToken = userAuth.values.accessToken;
        await ProjectAPI.update(formData,params.projectId as string)
        setLoadding(false);
        navigate("/projects");
    };



    return loadding ? <Loadding/> : <>
        <CreateForm title="Edit Project" type="update" buttonFunc={update}>
            <MarginElements>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="Name"
                    value={formData.name}
                    onChange={(e)=>setFormData({...formData, name: e.target.value})}
                    />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="Description"
                    value={formData.description}
                    onChange={(e)=>setFormData({...formData, description: e.target.value})}
                    />
            </Form.Group>
            </MarginElements>
        </CreateForm>
    </>
}


