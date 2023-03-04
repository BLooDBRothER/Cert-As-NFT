import React, {createContext, useContext, useEffect, useState} from 'react'
import { axiosCheckLogin, axiosLogout } from '../apis/endpoint';

const userContext = createContext({});

export const useUser = () => useContext(userContext);

const UserProvider = ({children}) => {

  const [user, setUser] = useState({isLoggedIn: false});

  async function checkLogin(){
    const res = await axiosCheckLogin();
    if(res.status === 200){
      setUser({email: res.data.email, address: res.data.address, isLoggedIn: true});
      return;
    }
    console.log(res);
  }

  useEffect(() => {
    checkLogin();
  }, [])

  async function login(data){
    setUser({email: data.email, address: data.address, isLoggedIn: true});
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
        logout
      }
    }
  >
    {children}
    </userContext.Provider>
  )
}

export default UserProvider
