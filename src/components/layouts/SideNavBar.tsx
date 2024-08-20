import { Link, useLocation, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {  useContext, useState } from "react";
import styled from "styled-components";
import { userAuthContext } from "../../App";
import { Button } from "react-bootstrap";
import { AuthorizationAPI } from "../../services/AuthorizationAPI";

const SideNavBar: React.FC<{setLoadding: (e:boolean)=>void}> = ({setLoadding})=>{
    const [collapse, setCollapse] = useState<boolean>(false);
    const userAuth =  useContext(userAuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const reverseCollapse = ()=>setCollapse(!collapse);

    const logout = ()=>{
        userAuth.setFunction({
            refreshToken: "",
            accessToken: "",
            userId: ""
        })
    }

    const refreshToken = async ()=>{
        setLoadding(true)
        const token = await AuthorizationAPI.Token(userAuth.values.refreshToken);
        userAuth.setFunction({...userAuth.values, accessToken: token.accessToken});
        // navigate("/")
        // setTimeout(() => {
        //     navigate(location.pathname)
        // }, 200);
        setLoadding(false)
        
    }

    return <div className="sideBar">
        
        <Sidebar 
            collapsed={collapse}
            collapsedWidth="70px"
            style={{height:"100vh"}}
            className="animate__animated animate__bounceInLeft animate__slow"
            >
            <button onClick={()=> reverseCollapse()} className="side_bar_button">
                <FaIcons.FaBars/>
            </button>
            <Menu style={{opacity: collapse ? 0 : 1}} onClick={()=> reverseCollapse()} >
                <MenuItem component={<Link to="/" />}>Home</MenuItem>
                <MenuItem component={<Link to="/projects" />}>Projects</MenuItem>
                <MenuItem component={<Link to="/user" />}>Users</MenuItem>
                <MenuItem component={<Link to="/settings" />}>Setting</MenuItem>
                <MenuItem component={<div/>} onClick={refreshToken}>Refresh Token</MenuItem>
                <MenuItem component={<Link to="/login" />} onClick={logout}>logout</MenuItem>
            </Menu>
        </Sidebar>
    </div>
}

const MenuLink = styled(Link)`
    text-decoration: none;
`

export {SideNavBar};