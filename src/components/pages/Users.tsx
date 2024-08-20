import { Alert, Button, ButtonGroup, Card, Form, InputGroup } from "react-bootstrap"
import { ActionPanelElement } from "../layouts/ActionPanelElement"
import { Status } from "../../enums/Status";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MarginElements } from "../layouts/MarginElements";
import { CustomCard } from "../layouts/CustomCard";
import { ProjectAPI } from "../../services/ProjectAPI";
import { Loadding } from "../layouts/Loadding";
import { Project } from "../../models/Project";
import { useFormik } from "formik";
import { Variant } from "../../enums/BootrapEnums";
import { userAuthContext } from "../../App";
import { User } from "../../models/User";
import { UserAPI } from "../../services/UserAPI";
import { UserRole } from "../../enums/UserRole";





export const Users: React.FC = ()=>{

    const userAuth = useContext(userAuthContext)
    const [users, setUsers] = useState<User[] | null>(null);
    const navigate = useNavigate();
    //Loading
    const [loadding, setLoadding] = useState<boolean>(false);

    const filters = useFormik({
        initialValues: {
          idFilter:'',
          nameFilter:'',
          surnameFilter:'',
          role: 'all'
        },
        onSubmit: ()=>{},
      })


    //mapping filters
    const filterIdCb = (u: User) => u._id.includes(filters.values.idFilter) 
    const filterNameCb = (u: User) => u.name.includes(filters.values.nameFilter)
    const filterSurnameCb = (u: User) => u.surname.includes(filters.values.surnameFilter)
    const filterRoleCb = (u: User) => filters.values.role == "all" ? true : u.role == filters.values.role


    useEffect(()=>{
        (async ()=>{
            setLoadding(true)
            const users = await UserAPI.getAll()
            setUsers(users)
            setLoadding(false)
        })()
    },[]);


    const filteredUsers = users
    ?.filter(filterIdCb)
    .filter(filterNameCb)
    .filter(filterSurnameCb)
    .filter(filterRoleCb)


    return loadding ? <Loadding/> : <div>
    <ActionPanelElement>
             
            <Form>
                 <InputGroup>
                 <InputGroup.Text>User id</InputGroup.Text>
                 <Form.Control 
                     id="idFilter"
                     value={filters.values.idFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             <Form>
                 <InputGroup>
                 <InputGroup.Text>User name</InputGroup.Text>
                 <Form.Control 
                     id="nameFilter"
                     value={filters.values.nameFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             <Form>
                 <InputGroup>
                 <InputGroup.Text>User surname</InputGroup.Text>
                 <Form.Control 
                     id="descriptionFilter"
                     value={filters.values.surnameFilter}
                     onChange={filters.handleChange}
                     />
                 </InputGroup>
             </Form>
             <Form>
                <InputGroup>
                    <InputGroup.Text>User Role</InputGroup.Text>
                    <Form.Select 
                        id="role"
                        value={filters.values.role} 
                        onChange={filters.handleChange}>
                        <option value={"all"}>all</option>
                        { (Object.keys(UserRole) as Array<keyof typeof UserRole>).map((key,id) => {
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
             
            
             
     </ActionPanelElement>


     <MarginElements>
        { filteredUsers && filteredUsers.length > 0 ? 
        filteredUsers
        .map( (u: User, i: number) => {
            return (
             <CustomCard key={i}>
                <Card.Header><b>Id:</b> {u._id}</Card.Header>
                <Card.Body>
                    <MarginElements>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Name</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={u.name}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Surname</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={u.surname}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">Role</InputGroup.Text>
                            <Form.Control
                            type="text"
                            disabled
                            value={u.role}
                            />
                        </InputGroup>
                        
                    </MarginElements>
                </Card.Body>
            </CustomCard>
            )
        })
        : <Alert variant={Variant.info}>nothing</Alert>}
        
     </MarginElements>
    
    </div>
}