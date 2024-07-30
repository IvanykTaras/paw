import './App.css'
import { Project } from './models/Project'
import { StoryLayout } from './components/StoryLayout';
import { SideNavBar } from './components/SideNavBar';
import { Outlet } from 'react-router-dom';


function App() {
  

 
  return (
    <>
      <SideNavBar/>
      <Outlet/>
    </>
  )
}


export default App
