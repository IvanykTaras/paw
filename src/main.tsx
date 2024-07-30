import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { StoryLayout } from './components/StoryLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        path: "/storyLayout",
        element: <StoryLayout/>
      },
      { 
        path: "/2",
        element: <div>element 2</div>
      },
      { 
        path: "/3",
        element: <div>element 3</div>
      },
      { 
        path: "/3",
        element: <div>element 3</div>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
