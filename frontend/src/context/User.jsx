import React, {createContext, useContext, useEffect, useState} from 'react'
import { axiosCheckLogin, axiosLogin, axiosLogout, axiosRegister } from '../axios';

const userContext = createContext({});

export const useUser = () => useContext(userContext);

const UserProvider = ({children}) => {

  const [user, setUser] = useState({isLoggedIn: false});

  async function checkLogin(){
    const res = await axiosCheckLogin();
    if(res.status === 200){
      setUser({email: res.data.email, isLoggedIn: true});
      return;
    }
    console.log(res);
  }

  useEffect(() => {
    checkLogin();
  }, [])

  async function login(data){
    const res = await axiosLogin(data);
    if(res.status === 200){
      setUser({email: res.data.email, isLoggedIn: true});
    }
    return res;
  }

  async function register(data){
    const res = await axiosRegister(data);
    return res;
  }

  async function logout(){
    const res = await axiosLogout();
    if(res.status === 200){
      setUser({isLoggedIn: false});
    }
  }

  return (
    <userContext.Provider value={
      {
        user,
        login,
        register,
        logout
      }
    }
  >
    {children}
    </userContext.Provider>
  )
}

export default UserProvider
