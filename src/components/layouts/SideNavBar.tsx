import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {  useState } from "react";
import styled from "styled-components";

const SideNavBar: React.FC = ()=>{
    const [collapse, setCollapse] = useState<boolean>(true);

    const reverseCollapse = ()=>setCollapse(!collapse);

    return <div className="sideBar">
        
        <Sidebar 
            collapsed={collapse}
            collapsedWidth="70px"
            style={{height:"100vh"}}
            >
            <button onClick={()=> reverseCollapse()} className="side_bar_button">
                <FaIcons.FaBars/>
            </button>
            <Menu style={{opacity: collapse ? 0 : 1}}>
                <MenuItem component={<Link to="/" />}>Home</MenuItem>
                <MenuItem component={<Link to="/projects" />}>Projects</MenuItem>
                <MenuItem component={<Link to="/settings" />}>Setting</MenuItem>
            </Menu>
        </Sidebar>
    </div>
}

const MenuLink = styled(Link)`
    text-decoration: none;
`

export {SideNavBar};