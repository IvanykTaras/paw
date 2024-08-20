import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import { Form, InputGroup, Button, Card, Alert, ButtonGroup } from "react-bootstrap";
import { Link, Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Project } from "../../models/Project";
import { ProjectAPI } from "../../services/ProjectAPI";
import { ActionPanelElement } from "../layouts/ActionPanelElement";
import { CustomCard } from "../layouts/CustomCard";
import { Loadding } from "../layouts/Loadding";
import { MarginElements } from "../layouts/MarginElements";
import { Functionality } from "../../models/Functionality";
import { FunctionalityAPI } from "../../services/FunctionalityAPI";
import { Variant } from "../../enums/BootrapEnums";
import { Status } from "../../enums/Status";
import { Priority } from "../../enums/Priority";
import { userAuthContext } from "../../App";

export const Functionalities: React.FC = ()=>{
    const navigate = useNavigate();
    const userAuth = useContext(userAuthContext)
    const [functionalities, setfunctionalities] = useState<Functionality[] | null>(null);

    //Loading
    const [loadding, setLoadding] = useState<boolean>(false);

    const filters = useFormik({
        initialValues: {
            idFilter: '',
            nameFilter: '',
            descriptionFilter: '',
            statusFilter: 'all',
            priorityFilter: 'all',
            projectIdFilter: '',
            userIdFilter: ''
        },
        onSubmit: ()=>{},
      })


    const { projectId } = useParams();

    //mapping filters
    const filterProjectIdCb = (f: Functionality) => f.projectId ==  projectId;
    const filterIdCb = (f: Functionality) => f._id.includes(filters.values.idFilter) 
    const filterNameCb = (f: Functionality) => f.name.includes(filters.values.nameFilter)
    const filterDescriptionCb = (f: Functionality) => f.description.includes(filters.values.descriptionFilter)
    const filterStatusCb = (f: Functionality) =>  filters.values.statusFilter == "all" ? true : f.status == filters.values.statusFilter 
    const filterPriorityCb = (f: Functionality) => filters.values.priorityFilter == "all" ? true : f.priority == filters.values.priorityFilter


    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
            FunctionalityAPI.accessToken = userAuth.values.accessToken;
            const funcs = await FunctionalityAPI.getAll()
            setfunctionalities(funcs)
            setLoadding(false)
        })()
    },[]);

    const deleteFunc = async (id:string)=>{
        setLoadding(true)
        FunctionalityAPI.accessToken = userAuth.values.accessToken;
        await FunctionalityAPI.delete(id);
        const funcs = await FunctionalityAPI.getAll()
        setfunctionalities(funcs)
        setLoadding(false)        
    }



    const filteredFunctionalities = functionalities
    ?.filter(filterProjectIdCb)
    .filter(filterIdCb)
    .filter(filterNameCb)
    .filter(filterDescriptionCb)
    .filter(filterPriorityCb)
    .filter(filterStatusCb);


    return loadding ? <Loadding/> : <div>
    <ActionPanelElement >
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
             <Form>
                <InputGroup>
                <InputGroup.Text>Priority</InputGroup.Text>
                <Form.Select 
                    id="priorityFilter"
                    value={filters.values.priorityFilter} 
                    onChange={filters.handleChange}>
                    <option value={"all"}>all</option>
                    { (Object.keys(Priority) as Array<keyof typeof Priority>).map((key,id) => {
                        return <option 
                                    key={id} 
                                    value={key.toLowerCase()}
                                    
                                    >
                                {key}
                                </option>;
                    })}
                </Form.Select>
                </InputGroup>
             </Form>
             <Form>
                <InputGroup>
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Select 
                    id="statusFilter"
                    value={filters.values.statusFilter} 
                    onChange={filters.handleChange}>
                    <option value={"all"}>all</option>
                    { (Object.keys(Status) as Array<keyof typeof Status>).map((key,id) => {
                        return <option 
                                    key={id} 
                                    value={key.toLowerCase()}
                                    
                                    >
                                {key}
                                </option>;
                    })}
                </Form.Select>
                </InputGroup>
             </Form>
         
             
            <Link to={`/functionality/${projectId}/create`}>
                <Button variant='success'>create functionality</Button>
            </Link>
             
     </ActionPanelElement>


     <MarginElements>
        { filteredFunctionalities && filteredFunctionalities.length > 0  ? 
        filteredFunctionalities
        .map( (f: Functionality, i: number) => {
            const date = new Date(f.creationDate);
            const stringDate = date.toISOString().split('T')[0]
            
            return (    
             <CustomCard key={i}>
                <Card.Header><b>Id:</b> {f._id}</Card.Header>
                <Card.Body>
                    <MarginElements>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.name}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Description</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.description}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Priority</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.priority}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Project Id</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.projectId}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Ceation Date</InputGroup.Text>
                            <Form.Control
                            type="date"
                            disabled
                            value={stringDate}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Status</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.status}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">User Id</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={f.userId}
                            />
                        </InputGroup>
                    </MarginElements>
                </Card.Body>
                <Card.Footer>                    
                    
                    <ButtonGroup>
                        <Button onClick={()=>navigate(`/task/${f._id}`)}>Tasks</Button>
                        <Button variant={Variant.secondary} onClick={()=>navigate(`/functionality/edit/${f._id}`)}>update</Button>
                        <Button variant={Variant.danger} onClick={()=>deleteFunc(f._id)}>Delete</Button>
                    </ButtonGroup>
                    
                </Card.Footer>
            </CustomCard>
            )
        })
        : <Alert variant={Variant.info}>nothing</Alert>}
        
     </MarginElements>
    
    </div>
}