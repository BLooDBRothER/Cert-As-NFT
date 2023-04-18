import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Regsiter';
import UserProvider from './context/User';
import Verify from './pages/Verify';
import MetaMaskProvider from './context/MetaMask';
import Mint from './pages/mint';
import Profile from './pages/profile';
import Personal from './pages/profile/Personal';
import Course from './pages/profile/Course';
import Security from './pages/profile/Security';
import Certificate from './pages/certificate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: "/verify",
    element: <Verify />
  },
  {
    path: "/mint",
    element: <Mint />
  },
  {
    path: "/setting",
    element: <Profile />,
    children:[
      {
        path: "personal",
        element: <Personal />,
        handle: {
          idx : 0
        }
      },
      {
        path: "course",
        element: <Course />,
        handle: {
          idx : 1
        }
      },
      {
        path: "security",
        element: <Security />,
        handle: {
          idx : 2
        }
      },
    ]
  },
  {
    path: "certificate/:cert_uuid",
    element: <Certificate />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetaMaskProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </MetaMaskProvider>
  </React.StrictMode>,
)
