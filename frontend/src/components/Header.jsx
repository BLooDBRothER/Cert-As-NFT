import React from 'react'
import Button from './Button';
import metamaskIc from '../assets/metamask-icon.svg'

const Header = () => {

    return (
        <header className='bg-secondary text-primary flex justify-between items-center p-4 mb-2 h-[80px]'>
            <h1>YOUR CERTIFICATE</h1>
            <Button handleCss='flex items-center' >Connect Wallet <span><img className='mx-2' width={25} src={metamaskIc} /></span></Button>
        </header>
    )
}

export default Header