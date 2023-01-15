import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '../components/Button';

const Register = () => {
    const [orgName, setOrgName] = useState('');
    const [orgId, setOrgId] = useState('');
    const [email, setEmail] = useState('');
    const [walletAddr, setWalletAddr] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [passErr, setPassErr] = useState('');
    const [rePassErr, setRePassErr] = useState('');

    const checkPasswordMatch = (e) => {
        if(!password.localeCompare('') || !rePassword.localeCompare('')){
            return;
        }
        const errMsg = password !== rePassword ? 'Password Does not match' : '';
        setRePassErr(errMsg);
    }

    const checkPasswordRegex = () => {
        console.log(password)
        if(!password.localeCompare('')){
            setPassErr('');
            return;
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/gm;
        const isMatch = regex.test(password);
        if(isMatch){
            setPassErr('');
        }
        else{
            setPassErr('Must contain one Upper, Lower, No, SPchar')
        }
    }

    useEffect(checkPasswordRegex, [password]);
    useEffect(checkPasswordMatch, [password, rePassword]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className="auth-cnt flex items-center justify-center">
            <form className='p-4 bg-secondary-lg rounded-lg text-2xl flex flex-col gap-5 mt-4 register-form'>
                <div className='text-accent flex gap-2 justify-center items-center pb-2 border-b border-primary'>
                    <WorkspacePremiumIcon />
                    <h1>Organization Register</h1>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-name" sx={{color: '#EEE'}}>Organization Name</InputLabel>
                        <Input
                            required
                            id="standard-adornment-name"
                            type='text'
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            value={orgName}
                            onChange={(e) => {setOrgName(e.target.value)}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton tabIndex={-1} >
                                        {<CorporateFareIcon className='text-primary' />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-id" sx={{color: '#EEE'}}>Organization ID</InputLabel>
                        <Input
                            required
                            id="standard-adornment-id"
                            type='text'
                            value={orgId}
                            onChange={(e) => {setOrgId(e.target.value)}}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton tabIndex={-1} >
                                        {<ArticleIcon className='text-primary' />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-address" sx={{color: '#EEE'}}>Wallet Address</InputLabel>
                        <Input
                            required
                            id="standard-adornment-address"
                            type='text'
                            value={walletAddr}
                            onChange={(e) => {setWalletAddr(e.target.value)}}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton tabIndex={-1} >
                                        {<AccountBalanceWalletIcon className='text-primary' />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-email" sx={{color: '#EEE'}}>E-Mail</InputLabel>
                        <Input
                            required
                            id="standard-adornment-email"
                            type='text'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            endAdornment={
                                <InputAdornment  position="end">
                                    <IconButton tabIndex={-1} >
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
                            required
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
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
                        <p className='text-sm font-thin text-danger absolute top-full'>{passErr}</p>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-re-password" sx={{color: '#EEE'}}>Re - Password</InputLabel>
                        <Input
                            required
                            id="standard-adornment-re-password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{color: '#EEE', fontSize: '1.5rem'}}
                            value={rePassword}
                            error={rePassErr ? true : false}
                            onChange={(e) => {setRePassword(e.target.value)}}
                        />
                        <p className='text-sm font-thin text-danger absolute top-full'>{rePassErr}</p>
                    </FormControl>
                </div>
                <p className=' text-sm text-primary text-center'>Already have an Account ? <NavLink to="/login" className={'text-danger underline'}>Login Here</NavLink></p>
                <Button>Login</Button>
            </form>
        </div>
    )
}

export default Register