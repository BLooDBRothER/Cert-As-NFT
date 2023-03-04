import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { useUser } from '../../context/User'
import Index from './Index';
import { useMetaMask } from '../../context/MetaMask';

const Home = () => {
  const {user} = useUser();
  const {account} = useMetaMask();

  return (
    <>
    <Header showWallet />
    {user.isLoggedIn && !account && <div>Please connect to the wallet</div>}
    {account}
    {
      user.isLoggedIn ?
        <div>Home</div> :
        <Index />
    }
    </>
  )
}

export default Home
