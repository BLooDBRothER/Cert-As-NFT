import React from 'react'
import home_logo from '../../assets/home_cert.png'
import Button from '../../components/Button'
import { NavLink } from 'react-router-dom'

const Index = () => {
    return (
        <main className=' flex flex-col-reverse justify-evenly items-center home-main p-3 pb-5 md:flex-row'>
            <section className='flex flex-col h-full items-center sec-1 p-4 rounded-lg text-primary text-xl sm:justify-center'>
                <h1 className='text-accent text-center'>ALL YOUR CERTIFICATE IN ONE PLACE</h1>
                <p className='text-center'>Certificates authorized by the respective verified organization</p>
                <div>
                    <ul className='list-disc'>
                        <li>No Fake Certificate</li>
                        <li>Only Verified organization</li>
                    </ul>
                </div>
                <div className='flex justify-evenly w-full'>
                    <NavLink to="login"><Button>Login</Button></NavLink>
                    <NavLink to="register"><Button>Sign Up</Button></NavLink>
                </div>
            </section>
            <section>
                <img src={home_logo} />
            </section>
        </main>
    )
}

export default Index
