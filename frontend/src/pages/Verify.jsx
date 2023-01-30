import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, CircularProgress } from '@mui/material';
import { axiosVerify } from '../axios';
import Header from '../components/Header';

const Verify = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const [isVerified, setIsVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(false);

    async function verifyMail() {
        const res = await axiosVerify(token);
        if (res.status === 200) {
            setIsVerified(true);
            setMessage(res.data.message);
            return;
        }
        console.log(res.data.message)
        setAlert(res.data.message);
    }

    useEffect(() => {
        verifyMail();
    }, [])

    return (
        <>
            <Header />
            <div className='home-main text-primary auth-cnt flex items-center justify-center p-2'>
                <div className='p-4 bg-secondary-lg text-primary rounded-lg text-2xl flex flex-col gap-5 items-center justify-center max-w-[400px]'>
                    <span className='text-center'>{isVerified ? message : 'Please wait while your E-Mail is validataing'}
                    </span>
                    <div className=' h-[50px] flex items-center justify-center'>
                        {!isVerified && alert && <Alert severity="error">{alert}</Alert>}
                        {!isVerified && !alert && <CircularProgress />}
                        {isVerified && <Link className='link-btn' to="/">Home</Link>}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Verify
