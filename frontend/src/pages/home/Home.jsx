import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { useUser } from '../../context/User'
import Index from './Index';
import { useMetaMask } from '../../context/MetaMask';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {user} = useUser();
  const {account} = useMetaMask();

  const navigate = useNavigate();

  const [message, setMessage] = useState('')

  useEffect(() => {
    if(account.address && account.isOrganization && !user.isLoggedIn){
      navigate('/login');
    }
    // if(account.address && !account.isOrganization){

    // }
    if(user.isLoggedIn && !account.address){
      setMessage("Please connect to the metamask wallet")
      return;
    }
    console.log(user)
    if(user.isLoggedIn && account.address !== user.address){
      setMessage("Seems to be wrong address")
    }
    setMessage("");
  }, [account, user.isLoggedIn])

  return (
    <>
    <Header showWallet />
    {message && <div>{message}</div>}
    {!user.isLoggedIn && !account.address && <Index />}
    </>
  )
}

export default Home
