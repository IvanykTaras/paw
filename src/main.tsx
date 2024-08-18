import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//css
import "./css/normalize.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css'
import './css/App.css'
import "./css/SideNavBar.css"
import 'animate.css';

import { Settings } from './components/pages/Settings.tsx';
import { Projects } from './components/pages/Projects.tsx';
import { CreateProject } from './components/pages/CreateProject.tsx';
import { CreateTask } from './components/pages/CreateTask.tsx';
import { CreateFunctionality } from './components/pages/CreateFunctionality.tsx';
import { Functionalities } from './components/pages/Functionalities.tsx';
import { Tasks } from './components/pages/Tasks.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        path: "/projects",
        element: <Projects/>,
      },
      {
        path: "/projects/create",
        element: <CreateProject/>
      },
      {
        path: "/functionality/:projectId",
        element: <Functionalities/>
      },
      {
        path: "/functionality/:projectId/create",
        element: <CreateFunctionality/>
      },
      {
        path: "/task/:functionalityId",
        element: <Tasks/>
      },
      {
        path: "/task/:functionalityId/create",
        element: <CreateTask/>
      },
      { 
        path: "/settings",
        element: <Settings/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
