import React, { useContext, useState } from "react";
import { CreateForm } from "../layouts/CreateForm";
import { MarginElements } from "../layouts/MarginElements";
import { CustomCard } from "../layouts/CustomCard";
import Form from "react-bootstrap/esm/Form";
import { Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { UserAPI } from "../../services/UserAPI";
import { useNavigate } from "react-router-dom";
import { AuthorizationAPI } from "../../services/AuthorizationAPI";
import { IUser } from "../../interfaces/IUser";
import { userAuthContext } from "../../App";
import { GoogleLogin } from "@react-oauth/google";
import { decodeToken, useJwt } from "react-jwt";
import { Loadding } from "../layouts/Loadding";

export const Login: React.FC = ()=>{

    const navigate = useNavigate();
    const [loadding,setLoadding] = useState(false);
    const userAuth = useContext(userAuthContext);
    const formik = useFormik({
        initialValues:{
            name: '',
            password: ''
        },
        onSubmit: ()=>{}
    });



    const loginUser = async ()=>{
        setLoadding(true)
        const user = await UserAPI.getById(formik.values.name);
        if(user.password === formik.values.password){
            const newUser:IUser = {
                name: user.name,
                surname: user.surname,
                role: user.role,
                password: user.password
            }
            const tokens: { accessToken: string, refreshToken: string } = await AuthorizationAPI.Login(newUser);
            userAuth.setFunction({
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
                userId: user._id
            })
            navigate("/")
        }else{
            alert("login or password is wrong")
        }
        setLoadding(false)
    }


    const authenticateUser = async (mail: string)=>{
        setLoadding(true);
        const data = await AuthorizationAPI.Authentication(mail);
        if(data && data.userId){
            userAuth.setFunction({
                refreshToken: data.refreshToken,
                accessToken: data.accessToken,
                userId: data.userId
            })
            navigate("/")
        }else{
            alert("email doesn't exist")
        }
        setLoadding(false)
    }



    return  loadding ? <Loadding/>:<>
            <div style={{margin: "15rem auto", width: "30rem"}}>
                <CustomCard>
                    <Card.Header>
                        <Card.Title className="text-center">Login</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <MarginElements>
                            <Form.Group>
                                <Form.Label>id</Form.Label>
                                <Form.Control
                                    id="name"
                                    type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    id="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange} />
                            </Form.Group>
                        </MarginElements>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={()=>loginUser()}>Login</Button>
                        <button className="btn" onClick={()=>loginUser()}>
                            
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const u: {email: string} | null = decodeToken(credentialResponse.credential as string)
                                authenticateUser(u?.email as string)
                            }}
                            onError={() => {
                                alert('Login Failed');
                            }}
                        />
                        </button>
                    </Card.Footer>
                </CustomCard>
            </div>
            </>
}