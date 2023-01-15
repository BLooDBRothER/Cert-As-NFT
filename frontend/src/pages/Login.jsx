import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Button from '../components/Button';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className="auth-cnt flex items-center justify-center">
            <form className='p-4 bg-secondary-lg rounded-lg text-2xl flex flex-col gap-5'>
                <div className='text-accent flex gap-2 justify-center items-center pb-2 border-b border-primary'>
                    <WorkspacePremiumIcon />
                    <h1>Organization Login</h1>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-email" sx={{color: '#EEE'}}>E-Mail</InputLabel>
                        <Input
                            id="standard-adornment-email"
                            type='text'
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        {<EmailIcon className='text-primary' />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password" sx={{color: '#EEE'}}>Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
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
                <p className=' text-sm text-primary text-center'>Don't have and Account ? <NavLink to="register" className={'text-danger underline'}>Register Here</NavLink></p>
                <Button>Login</Button>
            </form>
        </div>
    )
}

export default Login