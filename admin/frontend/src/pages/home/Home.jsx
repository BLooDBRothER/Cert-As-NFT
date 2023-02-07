import React from 'react'
import Header from '../../components/Header';
import { useUser } from '../../context/User'
import Index from './Index';
import StatusTable from './StatusTable';

const Home = () => {
  const {user} = useUser();
  console.log(user)
  return (
    <>
    <Header />
    {
      !user.isLoggedIn ?
        <div className='flex flex-col items-center justify-center gap-2 text-accent'>
          <h1 className='mt-2 '>Available Organization</h1>
          <StatusTable />
        </div> :
        <Index />
    }
    </>
  )
}

export default Home;
