import React from 'react'
import home_logo from '../assets/home_cert.png'

const Index = () => {
    return (
        <main className=' flex justify-evenly items-center h-[calc(100% - 100px)] bg-secondary-lg'>
            <section className=''>
                <h1>ALL YOUR CERTIFICATE IN ONE PLACE</h1>
                <p>Certificates authorized by the respective verified organization</p>
                <div>
                    <ul className='list-disc'>
                        <li>No Fake Certificate</li>
                        <li>Only Verified organization</li>
                    </ul>
                </div>
            </section>
            <section>
                <img src={home_logo} />
            </section>
        </main>
    )
}

export default Index