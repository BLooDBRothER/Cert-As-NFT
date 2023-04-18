import React, { useEffect, useState } from 'react'
import { useMetaMask } from '../../context/MetaMask'
import { Card, CardMedia, CardContent, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import cert_img from '../../assets/c++.png'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const ShowCertificate = ({organization = false}) => {
    const {loading, certificate, loadStudentCertificate, loadOrgCertificate, setSelectedCertificate, account} = useMetaMask();
    const navigate = useNavigate();

    // const [certificate, setCertificate] = useState([]);

    useEffect(() => {
        // setTimeout(() => {
        //     setCertificate([{
        //         id: 1,
        //         org_logo: 'http://localhost:5000/logo/13979b78-1887-4c89-ba01-0d9b863ce7de-1679904943236.jpg',
        //         org_name: 'kct',
        //         course: 'C++'
        //     }])
        // }, 1000)
        organization ? loadOrgCertificate() : loadStudentCertificate();
    }, [account.address]);

    useEffect(() => {console.log(certificate)}, [certificate])

  return (
    <div>
        <h1>Your Certificate</h1>
        <div className='flex gap-4 flex-wrap p-4'>
            {certificate.map((cert) => {
                return (
                <Card key={cert.uuid} className='w-[300px] !bg-secondary-lg hover:shadow-md hover:shadow-accent' role='button' onClick={() => {navigate(`/certificate/${cert.uuid}`)}}>
                    <CardContent className='flex justify-between items-center' >
                        {cert.org_logo ? 
                            <img src={`http://localhost:5000/logo/${cert.org_logo}`} className='aspect-square w-[50px] rounded-full border' /> :
                            <CorporateFareIcon className='aspect-square w-[50px] rounded-full text-primary' />
                        }
                        <h3 className='text-xl text-primary'>{cert.org_name}</h3>
                    </CardContent>
                    <CardMedia>
                        <img src={cert.ipfs_link} className='w-[300px]' />
                    </CardMedia>
                    <CardContent className='flex justify-between items-center' >
                        <h3 className='text-xl text-primary'>{cert.course}</h3>
                        <Tooltip title='Copy URL'>
                            <IconButton>
                                <ContentCopyIcon className='text-accent' />
                            </IconButton>
                        </Tooltip>
                    </CardContent>
                </Card>
            )})}
        </div>
    </div>
  )
}

export default ShowCertificate
