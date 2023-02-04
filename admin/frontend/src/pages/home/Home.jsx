import React from 'react'
import Header from '../../components/Header';
import { useUser } from '../../context/User'
import Index from './Index';

const Home = () => {
  const {user} = useUser();
  console.log(user)
  return (
    <>
    <Header />
    {
      user.isLoggedIn ?
        <div>Home</div> :
        <Index />
    }
    </>
  )
}

export default Home;
