import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Button from '../components/Button';
import Resend from '../components/Resend';
import { useUser } from '../context/User';
import Header from '../components/Header';
import { axiosLogin, axiosSendMail } from '../apis/endpoint';

const Login = () => {

    const { user, login } = useUser();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [reminingTime, setReminigTime] = useState(0);
    const [alert, setAlert] = useState('');


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const resendEmail = async () => {
        const res = await axiosSendMail(email);
        console.log(res);
        if (res.status === 200 || res.status === 400) {
            console.log(res.data.resend_time);  
            setReminigTime(res.data.resend_time);
            return;
        }
    }

    const loginUser = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        console.log(data)
        const res = await axiosLogin(data);
        if(res.status === 200){
            login(res.data)
        }
        if(res.status === 401){
            setReminigTime(res.data.resend_time);
            return
        }
        if (res.status === 400 || res.status === 403) {
            setAlert(res.data.message);
            setTimeout(() => {
                setAlert('')
            }, 5000);
        }
        // if(res)
        //     console.log(res);
    }

    useEffect(() => {
        if(!user.isLoggedIn)
            return;

        navigate("/");
    }, [user]);

    return (
        <>
        <Header />
        <div className="form-cnt">
            {
                !reminingTime ?
                    <div className='relative'>
                        <form className='p-4 bg-secondary-lg rounded-lg text-2xl flex flex-col gap-5' onSubmit={loginUser}>
                            <div className='text-accent flex gap-2 justify-center items-center pb-2 border-b border-primary'>
                                <WorkspacePremiumIcon />
                                <h1>Organization Login</h1>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-email" sx={{ color: '#EEE' }}>E-Mail</InputLabel>
                                    <Input
                                        id="standard-adornment-email"
                                        type='email'
                                        required
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        sx={{ color: '#EEE', fontSize: '1.5rem' }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton tabIndex={-1}>
                                                    {<EmailIcon className='text-primary' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password" sx={{ color: '#EEE' }}>Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        sx={{ color: '#EEE', fontSize: '1.5rem' }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityOff className='text-primary' /> : <Visibility className='text-primary' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <p className=' text-sm text-primary text-center'>Don't have an Account ? <NavLink to="/register" className={'text-danger underline'}>Register Here</NavLink></p>
                            <Button>Login</Button>
                        </form>
                        {alert && <Alert className=' absolute top-full left-0 w-full mt-2' severity="error">{alert}</Alert>}
                    </div> :
                    <Resend time={reminingTime} onComplete={resendEmail} />
            }
        </div>
        </>
    )
}

export default Login
