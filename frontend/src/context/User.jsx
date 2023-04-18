import React, {createContext, useContext, useEffect, useState} from 'react'
import { axiosCheckLogin, axiosLogout } from '../apis/endpoint';

const userContext = createContext({});

export const useUser = () => useContext(userContext);

const UserProvider = ({children}) => {

  const [user, setUser] = useState({isLoggedIn: false});
  const [userLoading, setUserLoading] = useState(true);

  async function checkLogin(){
    const res = await axiosCheckLogin();
    if(res.status === 200){
      setUser({...res.data, isLoggedIn: true});
      return;
    }
    setUserLoading(false);
    console.log(res);
  }

  useEffect(() => {
    console.log(user)
    checkLogin();
  }, [])

  async function login(data){
    setUser({...data, isLoggedIn: true});
  }

  async function logout(){
    const res = await axiosLogout();
    if(res.status === 200){
      setUser({isLoggedIn: false});
    }
  }

  function updateCourse(courseData){
    setUser(prev => ({...prev, course: courseData}));
  }

  return (
    <userContext.Provider value={
      {
        user,
        userLoading,
        updateCourse,
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
