import React, { useEffect, useRef, useState } from 'react'
import { Box, Divider, FormControl, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LinkIcon from '@mui/icons-material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '../../components/Button';
import { axiosGetProfile, axiosRemoveProfile, axiosUpdateProfile, axiosUploadProfile } from '../../apis/endpoint';

const Personal = () => {
  const [personalData, setPersonalData] = useState({
    email: '',
    organization_name: '',
    wallet_address: '',
    link: '',
    organization_logo: '',
  });

  const [newLink, setNewLink] = useState('');

  const fileInputRef = useRef();

  async function getProfile(){
    const res = await axiosGetProfile();
    console.log(res);
    setPersonalData(prev => ({...prev, ...res.data}))
    setNewLink(res.data.link);
  }

  async function updateProfile(e){
    e.preventDefault();
    if(!newLink || newLink === personalData.link) return;
    const data = {
      data: {
        link: newLink
      }
    }
    const res = await axiosUpdateProfile(data);
    if(res.status !== 200) return;
    setPersonalData(prev => ({...prev, link: newLink}));
  }

  async function uploadProfilePic(e){
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('old_image', personalData.organization_logo);
    const res = await axiosUploadProfile(formData);
    console.log(res)
    setPersonalData(prev => ({...prev, organization_logo: res.data.logo}))
  }

  async function removeProfilePic(){
    console.log(personalData.organization_logo)
    if(!personalData.organization_logo) return;
    const payload = {
      image: personalData.organization_logo
    }
    await axiosRemoveProfile(payload);
    setPersonalData(prev => ({...prev, organization_logo: ''}));
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <form className=' flex flex-col-reverse gap-2 lg:flex-row' onSubmit={updateProfile}>
        <div className='flex flex-col items-center gap-5'>
          <div>
            <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                <TextField
                  id="email"
                  label="E-Mail"
                  InputLabelProps={{
                    className: '!text-primary'
                  }}
                  InputProps={{
                    className: '!text-primary',
                    endAdornment: (
                      <InputAdornment position="end">
                        {<EmailIcon className='text-primary' />}
                      </InputAdornment>
                    ),
                  }}
                  readOnly
                  value={personalData.email}
                  variant="outlined"
                />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                <TextField
                  id="name"
                  label="Name"
                  InputLabelProps={{
                    className: '!text-primary'
                  }}
                  InputProps={{
                    className: '!text-primary',
                    endAdornment: (
                      <InputAdornment position="end">
                        <CorporateFareIcon className='text-primary' />
                      </InputAdornment>
                    ),
                  }}
                  readOnly
                  value={personalData.organization_name}
                  variant="outlined"
                />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                <TextField
                  id="wallet-Address"
                  label="Wallet Address"
                  InputLabelProps={{
                    className: '!text-primary'
                  }}
                  InputProps={{
                    className: '!text-primary',
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountBalanceWalletIcon className='text-primary' />
                      </InputAdornment>
                    ),
                  }}
                  readOnly
                  value={personalData.wallet_address}
                  variant="outlined"
                />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                <TextField
                  id="link"
                  label="Website Link"
                  InputLabelProps={{
                    className: '!text-primary'
                  }}
                  InputProps={{
                    className: '!text-primary',
                    endAdornment: (
                      <InputAdornment position="end">
                        <a href={newLink || '#'} target='_blank'>
                          <LinkIcon className='text-accent' />
                        </a>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {setNewLink(e.target.value)}}
                  value={newLink}
                  variant="outlined"
                />
            </FormControl>
          </div>
          <Button type='submit' handleCss='mx-auto text-sm'>Update Details</Button>
        </div>
        <div className='flex flex-col items-center justify-start flex-1'>
          <Box className='w-[200px] h-[200px]'>
            {personalData.organization_logo ? 
              <img src={`http://localhost:5000/logo/${personalData.organization_logo}`} className='aspect-square rounded-full border' /> :
              <div className='w-[200px] h-[200px] rounded-full border flex items-center justify-center'>
                <AccountBoxIcon className='text-primary !text-8xl ' />
              </div>
            }
          </Box>
          <div className='my-2'>
            <MenuList
              id="basic-menu"
              className='bg-secondary rounded-md'
            >
              <MenuItem className='hover:!bg-accent hover:!text-secondary' onClick={() => {fileInputRef.current?.click();}}>
                <ListItemIcon><CloudUploadIcon className='text-primary' /></ListItemIcon>
                <ListItemText>Upload</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem className='hover:!bg-accent hover:!text-secondary' onClick={removeProfilePic}>
                <ListItemIcon><RemoveIcon className='text-primary' /></ListItemIcon>
                <ListItemText>Remove</ListItemText>
              </MenuItem>
            </MenuList>
          </div>
        </div>
      </form>
      {/* <form encType='multipart/form-data' onSubmit={uploadProfilePic} >
        <button type='submit' className='hidden' ref={fileFormRef}></button>
      </form> */}
        <input name='image' type='file' hidden ref={fileInputRef} onChange={uploadProfilePic} />
    </>
  )
}

export default Personal
