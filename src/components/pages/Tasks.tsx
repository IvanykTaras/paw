import { Link, useNavigate, useParams } from "react-router-dom"
import { Canban } from "../layouts/Canban";
import { ActionPanelElement } from "../layouts/ActionPanelElement";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import { CustomCard } from "../layouts/CustomCard";
import { useEffect, useState } from "react";
import { TaskAPI } from "../../services/TaskAPI";
import { Task } from "../../models/Task";
import { Variant } from "../../enums/BootrapEnums";
import Loading from "react-loading";
import { ProjectAPI } from "../../services/ProjectAPI";
import { Project } from "../../models/Project";
import { MarginElements } from "../layouts/MarginElements";
import { Status } from "../../enums/Status";
import { ITask } from "../../interfaces/ITask";
import { Priority } from "../../enums/Priority";
import { useFormik } from "formik";
import { UserAPI } from "../../services/UserAPI";
import { UserRole } from "../../enums/UserRole";

export const Tasks: React.FC = ()=>{

    const [show, setShow] = useState(false);
    const {functionalityId} = useParams();
    const [tasks, setTasks] = useState<Task[] | null>( null );
    const [findTask, setFindTask] = useState<Task | null>( null);
    const [loadding, setLoadding] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=>{

        (async ()=>{
            setLoadding(true)
            const tasksList = await TaskAPI.getAll() 
            setTasks(tasksList)
            console.log(tasksList)
            setLoadding(false)
        })()
    },[findTask]);

    const formik = useFormik({
        initialValues: {
            userId: ""
        },
        onSubmit: ()=>{}
    });


    const tasksFilteredTodo = tasks?.filter( (t:Task)=> t.status == Status.Todo).filter( (t:Task) => t.functionalityId === functionalityId)
    const tasksFilteredDoing = tasks?.filter( (t:Task)=> t.status == Status.Doing).filter( (t:Task) => t.functionalityId === functionalityId)
    const tasksFilteredDone = tasks?.filter( (t:Task)=> t.status == Status.Done).filter( (t:Task) => t.functionalityId === functionalityId)

    const showTask = async (id:string)=>{
        setShow(true)
        setLoadding(true)
        const findTask = await TaskAPI.getById(id); 
        setFindTask(findTask);
        setLoadding(false)
    }

    const updateUserId = async (id:string)=>{
        setLoadding(true)
        const newFindTask: ITask = {
            name: findTask?.name as string,
            description: findTask?.description as string,
            priority: findTask?.priority as Priority,
            functionalityId: findTask?.functionalityId as string,
            estimatedTime: findTask?.estimatedTime as Date,
            status: Status.Doing,
            userId: id,
            startDate: new Date,
        }
        const findUser = await UserAPI.getById(id);
        if(findUser.role === UserRole.DevOps || findUser.role === UserRole.Developer){
            
            await TaskAPI.update(newFindTask, findTask?._id as string); 
            showTask(findTask?._id as string);
            setLoadding(false)
        }else{
            alert("Wrong user");
            setLoadding(false)
        }
        
    }

    const completeTask = async ()=>{
        setLoadding(true)
        const newFindTask: ITask = {
            name: findTask?.name as string,
            description: findTask?.description as string,
            priority: findTask?.priority as Priority,
            functionalityId: findTask?.functionalityId as string,
            estimatedTime: findTask?.estimatedTime as Date,
            status: Status.Done,
            completionDate: new Date,
        }
        await TaskAPI.update(newFindTask, findTask?._id as string); 
        showTask(findTask?._id as string);
        setLoadding(false)
    }

    return loadding ? <Loading/> : <>    
        <ActionPanelElement>
            <Link to={`/task/${functionalityId}/create`}>
            <Button>Create task</Button>
            </Link>
        </ActionPanelElement>
        
        
      
        <BoardContainer fluid>
            <Row className='d-flex justify-content-around'>
                <Column md={3}>
                    <ColumnTitle>To Do</ColumnTitle>
                
                    {tasksFilteredTodo && tasksFilteredTodo.length > 0 ?  tasksFilteredTodo.map( (t:Task, i:number)=>{
                        return (
                        <CustomCard key={i}>
                            <Card.Header><b>Id:</b> {t._id}<br/><b>Name:</b> {t.name}</Card.Header>
                            <Card.Body>         
                                <MarginElements>
                                    
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">status</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.status}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">priority</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.priority}
                                        />
                                    </InputGroup>
                                </MarginElements>

                            </Card.Body>
                            <Card.Footer>
                                <Button style={{width:"100%"}} onClick={()=> showTask(t._id)}>Details</Button>
                            </Card.Footer>
                        </CustomCard>)
                    }) : <Alert variant={Variant.info}>nothing</Alert>}

                    


                </Column>
                <Column md={3}>
                    <ColumnTitle>Doing</ColumnTitle>
                    
                    {tasksFilteredDoing && tasksFilteredDoing.length > 0 ?  tasksFilteredDoing.map( (t:Task, i:number)=>{
                        return (
                        <CustomCard key={i}>
                            <Card.Header><b>Id:</b> {t._id}<br/><b>Name:</b> {t.name}</Card.Header>
                            <Card.Body>         
                                <MarginElements>
                                    
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">status</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.status}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">priority</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.priority}
                                        />
                                    </InputGroup>
                                </MarginElements>

                            </Card.Body>
                            <Card.Footer>
                                <Button style={{width:"100%"}} onClick={()=> showTask(t._id)}>Details</Button>
                            </Card.Footer>
                        </CustomCard>)
                    }) : <Alert variant={Variant.info}>nothing</Alert>}
                </Column>
                <Column md={3}>
                    <ColumnTitle>Done</ColumnTitle>
                    
                    {tasksFilteredDone && tasksFilteredDone.length > 0 ?  tasksFilteredDone.map( (t:Task, i:number)=>{
                        return (
                        <CustomCard key={i}>
                            <Card.Header><b>Id:</b> {t._id}<br/><b>Name:</b> {t.name}</Card.Header>
                            <Card.Body>         
                                <MarginElements>
                                    
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">status</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.status}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Text id="inputGroupPrepend">priority</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        disabled
                                        value={t.priority}
                                        />
                                    </InputGroup>
                                </MarginElements>

                            </Card.Body>
                            <Card.Footer>
                                <Button style={{width:"100%"}} onClick={()=> showTask(t._id)}>Details</Button>
                            </Card.Footer>
                        </CustomCard>)
                    }) : <Alert variant={Variant.info}>nothing</Alert>}
                </Column>
            </Row>
        </BoardContainer>


        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title><b>id:</b> {findTask?._id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MarginElements>       
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.name}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Description</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.description}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">priority</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.priority}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Functionality id</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.functionalityId}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Estimated time</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.estimatedTime.toString()}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Status</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.status}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Creation date</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.creationDate.toString()}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Start date</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.startDate?.toString()}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">Completion Date</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.completionDate?.toString()}
                        />
                    </InputGroup>


                    { findTask?.userId ? 
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">User id</InputGroup.Text>
                        <Form.Control
                        type="text"
                        disabled
                        value={findTask?.userId}
                        />
                    </InputGroup>
                    :
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">User id</InputGroup.Text>
                        <Form.Control
                        type="text"
                        id="userId"
                        value={formik.values.userId}
                        onChange={formik.handleChange}
                        />
                        <Button onClick={()=>updateUserId(formik.values.userId)}>Save</Button>
                    </InputGroup>}
                    
                </MarginElements>
            </Modal.Body>
            <Modal.Footer>
                { findTask?.status === Status.Doing && (
                    <Button variant={Variant.secondary} onClick={()=>completeTask()}>
                        Complete task
                    </Button>)}
            </Modal.Footer>
        </Modal>
    </>
} 



const BoardContainer = styled(Container)`
  min-height: 100vh;
  padding-top: 20px;
`;

const Column = styled(Col)`
  background-color: #e9ecef;
  border-radius: 5px;
  min-height: 90vh;
  margin: 10px;
 
`;

const ColumnTitle = styled.h2`
  text-align: center;
  color: #495057;
`;

const TaskCard = styled(Card)`
  margin-bottom: 10px;
`;