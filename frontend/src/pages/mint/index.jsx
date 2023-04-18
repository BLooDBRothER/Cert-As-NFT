import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Alert, MenuItem, Select, Paper, Skeleton, Backdrop, Box, Stepper, Step, StepButton, StepLabel } from '@mui/material';
import { Buffer } from "buffer";
import Button from '../../components/Button';
import { client } from '../../config.ipfs';
import { useMetaMask } from '../../context/MetaMask';
import { useUser } from '../../context/User';
import { useNavigate } from 'react-router-dom';
import cert_img from '../../assets/c++.png'

const steps = ["Creating NFT data", "Minting Certificate as NFT", "Approve the Certificate", "Transferring Certificate"]

const Mint = () => {
  const {createNFT, message, account, loadingAccount} = useMetaMask();
  const {user} = useUser();
  const navigate = useNavigate();

  const [inputObj, setInputObj] = useState({
    name: '',
    address: '',
    file: '',
    ipfs_link: '',
    course: user.course || []
  });
  const [courseSelected, setCourseSelected] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showStepper, setShowStepper] = useState(false);

  const [tempfile, setTempFile] = useState(null);

  const [fileMsg, setFileMsg] = useState("Please Select File");

  const uploadFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if(!file){
      return;
    }
    setFileMsg("Uploading File ....")
    setUploading(false)
    setInputObj({...inputObj, file: e.target.files})
    console.log('hi');
    try {
      const result = await client.add(file)
      console.log(result)
      setInputObj({...inputObj, ipfs_link: `https://ipfs.io/ipfs/${result.path}`});
      // setImage(`https://ipfs.io/ipfs/${result.path}`);
      setUploading(true);
      setFileMsg("File uploaded Successfully");
    } catch (error) {
      setFileMsg("Error in File Uploading");
      console.log("ipfs image upload error: ", error)
    }
    // setTimeout(() => {
    //   console.log('in')
    //   setTempFile(cert_img)
    //   setUploading(true)
    // }, [2000])
}


  function sendCertification(e){
    e.preventDefault();
    setShowStepper(true);
    const dataObj = {
      name: inputObj.name,
      ipfs_link: inputObj.ipfs_link,
      // ipfs_link: "http://localhost:5000/logo/13979b78-1887-4c89-ba01-0d9b863ce7de-1679904943236.jpg",
      course: courseSelected,
      org_email: user.email,
      org_name: user.organization_name,
      org_logo: user.organization_logo,
      org_link: user.link

    }
    createNFT(dataObj, inputObj.address);
  }

  useEffect(() => {
    console.log(account, loadingAccount)
    if(loadingAccount) return;
    console.log('here')
    if(!account.address || !user.isLoggedIn || !account.isOrganization) {
      navigate('/')
    }
  }, [account, user, loadingAccount])


  return (
    <>
        <Header showWallet />
        <div className={`form-cnt ${showStepper && 'blur-sm'}`}>
          <div className='p-4 bg-secondary-lg rounded-lg text-2xl flex flex-col gap-5'>
            <div className='text-accent flex gap-2 justify-center items-center pb-2 border-b border-primary'>
                <WorkspacePremiumIcon />
                <h1>Send Certificate</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-6 md:flex-row'>
              <form onSubmit={sendCertification} className='flex flex-col gap-4'>
                <div>
                  <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-name" sx={{ color: '#EEE' }}>Name</InputLabel>
                      <Input
                          id="standard-adornment-name"
                          type='text'
                          required
                          onChange={(e) => { setInputObj({...inputObj, name: e.target.value}) }}
                          sx={{ color: '#EEE', fontSize: '1.5rem' }}
                      />
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-address" sx={{ color: '#EEE' }}>Wallet Address</InputLabel>
                      <Input
                          id="standard-adornment-address"
                          type='text'
                          required
                          onChange={(e) => { setInputObj({...inputObj, address: e.target.value}) }}
                          sx={{ color: '#EEE', fontSize: '1.5rem' }}
                      />
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant='standard'>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#EEE' }}>Course</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Course"
                      variant='standard'
                      value={courseSelected}
                      onChange={(e) => {setCourseSelected(e.target.value)}}
                      sx={{ color: '#EEE' }}
                    >
                      {inputObj.course.map(course => (
                        <MenuItem key={course} value={course}>{course}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, width: 'clamp(20ch, 50vw, 25ch)' }} variant="standard">
                      <Input
                          id="standard-adornment-file"
                          type='file'
                          required
                          onChange={uploadFile}
                          sx={{ color: '#EEE', fontSize: '1.5rem' }}
                      />
                  </FormControl>
                </div>
                <Button>SEND CERTIFICATE</Button>
              </form>
              <div className='p-3 border-t md:border-l md:border-t-0'>
                <Paper elevation={6} className=' p-4 w-[350px] !bg-transparent flex flex-col gap-3 items-center'>
                  <h3 className='text-primary'>{fileMsg}</h3>
                  {
                    !uploading ?
                      <>
                        <Skeleton width="100%" height={200} />
                        <Skeleton><a href={inputObj.ipfs_link}> <Button>IPFS LINK</Button></a></Skeleton>
                      </>
                      :
                      <>
                        <div className='w-full h-[200px] bg-transparent'>
                          {/* {tempfile && <img className='w-full h-[200px]' src={inputObj.ipfs_link} />} */}
                          <img className='w-full h-[200px]' src={inputObj.ipfs_link} />
                        </div>
                        <a href={inputObj.ipfs_link} target='_blank'> <Button>IPFS LINK</Button></a>
                      </>
                  }
                </Paper>
              </div>
            </div>
          </div>
        </div>
        <Backdrop open={showStepper} className='bg-secondary'>
          <Box sx={{width: "80%"}}>
            <Stepper className=' bg-primary p-2 py-5 rounded-md' alternativeLabel activeStep={message.activeStep}>
                {steps.map((step, idx) => {
                  return (<Step key={step}>
                    <StepLabel sx={{'& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed': {color: '#23b123'} }} error={message.code === 1 && message.activeStep === idx ? true : false} className='text-accent'>{step}</StepLabel>
                  </Step>)
                })}
            </Stepper>
          {message.isCompleted && <Button handleCss='w-full mx-auto my-2' onClick={(e) => {setShowStepper(false)}}>Continue</Button>}
          </Box>
        </Backdrop>
    </>
  )
}

export default Mint
