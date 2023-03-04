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
