import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap"
import { ActionPanelElement } from "../layouts/ActionPanelElement"
import { Status } from "../../enums/Status";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MarginElements } from "../layouts/MarginElements";
import { CustomCard } from "../layouts/CustomCard";
import { ProjectAPI } from "../../services/ProjectAPI";
import { Loadding } from "../layouts/Loadding";
import { Project } from "../../models/Project";
import { useFormik } from "formik";
import { Variant } from "../../enums/BootrapEnums";
import { userAuthContext } from "../../App";





export const Projects: React.FC = ()=>{

    const userAuth = useContext(userAuthContext)
    const [projects, setProjects] = useState<Project[] | null>(null);

    //Loading
    const [loadding, setLoadding] = useState<boolean>(false);

    const filters = useFormik({
        initialValues: {
          idFilter:'',
          nameFilter:'',
          descriptionFilter:''
        },
        onSubmit: ()=>{},
      })


    //mapping filters
    const filterIdCb = (p: Project) => p._id.includes(filters.values.idFilter) 
    const filterNameCb = (p: Project) => p.name.includes(filters.values.nameFilter)
    const filterDescriptionCb = (p: Project) => p.description.includes(filters.values.descriptionFilter)


    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
            ProjectAPI.accessToken = userAuth.values.accessToken;
            const projects = await ProjectAPI.getAll()
            setProjects(projects)
            setLoadding(false)
        })()
    },[]);


    const filteredProjects = projects
    ?.filter(filterIdCb)
    .filter(filterNameCb)
    .filter(filterDescriptionCb)


    return loadding ? <Loadding/> : <div>
    <ActionPanelElement>
             
            <Form>
                 <InputGroup>
                 <InputGroup.Text>Project id</InputGroup.Text>
                 <Form.Control 
                     id="idFilter"
                     value={filters.values.idFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             <Form>
                 <InputGroup>
                 <InputGroup.Text>Project name</InputGroup.Text>
                 <Form.Control 
                     id="nameFilter"
                     value={filters.values.nameFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             <Form>
                 <InputGroup>
                 <InputGroup.Text>Project description</InputGroup.Text>
                 <Form.Control 
                     id="descriptionFilter"
                     value={filters.values.descriptionFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             
            <Link to="/projects/create">
                <Button variant='success'>create project</Button>
            </Link>
             
     </ActionPanelElement>


     <MarginElements>
        { filteredProjects && filteredProjects.length > 0 ? 
        filteredProjects
        .filter(filterIdCb)
        .filter(filterNameCb)
        .filter(filterDescriptionCb)
        .map( (p: Project, i: number) => {
            return (
             <CustomCard key={i}>
                <Card.Header><b>Id:</b> {p._id}</Card.Header>
                <Card.Body>
                    <MarginElements>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={p.name}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Description</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={p.description}
                            />
                        </InputGroup>
                    </MarginElements>
                </Card.Body>
                <Card.Footer>                    
                    <Link to={`/functionality/${p._id}`}>
                        <Button>Functionalities</Button>
                    </Link>
                </Card.Footer>
            </CustomCard>
            )
        })
        : <Alert variant={Variant.info}>nothing</Alert>}
        
     </MarginElements>
    
    </div>
}