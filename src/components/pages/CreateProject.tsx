import { Button, Card, Form } from "react-bootstrap"
import { CustomCard } from "../layouts/CustomCard"
import { ProjectAPI } from "../../services/ProjectAPI"
import { Project } from "../../models/Project"
import { useState } from "react"
import { Loadding } from "../layouts/Loadding"
import { IProject } from "../../interfaces/IProject"
import { CreateForm } from "../layouts/CreateForm"
import { useNavigate } from "react-router-dom"

export const CreateProject: React.FC = ()=>{
    const navigate = useNavigate();
    const [loadding, setLoadding] = useState<boolean>(false);
    const [formData, setFormData] = useState<IProject>({
        name: "",
        description: ""
    });


    const create = async ()=>{
        setLoadding(true);
        await ProjectAPI.create(formData)
        setLoadding(false);
        navigate("/projects");
    };



    return loadding ? <Loadding/> : <>
        <CreateForm title="Create Project" buttonFunc={create}>
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
        </CreateForm>
    </>
}


