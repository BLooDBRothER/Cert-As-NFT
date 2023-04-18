import React, { useState } from 'react'
import { flushSync } from 'react-dom';
import { Box, Divider, Chip, IconButton, Skeleton } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ShareIcon from '@mui/icons-material/Share';
import Header from '../../components/Header';
import { useMetaMask } from '../../context/MetaMask';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cert_img from '../../assets/c++.png'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';


const index = () => {
    const { getSingleCertificate, isAllSet } = useMetaMask();

    const { cert_uuid } = useParams();

    const [certificate, setCertificate] = useState({});
    const [loading, setLoading] = useState(true);

    const getCertificate = async () => {
        console.log('hrere', cert_uuid)
        const certificate = await getSingleCertificate(cert_uuid);
        if(!certificate?.length) return;
        console.log(certificate);
        flushSync(() => {
            setCertificate(certificate[0])
        })
        setLoading(false);
    }

    useEffect(() => {
        // if(!isAllSet) return
        getCertificate()
        // setTimeout(() => {
        //     setCertificate({
        //         id: 1,
        //         org_logo: 'http://localhost:5000/logo/13979b78-1887-4c89-ba01-0d9b863ce7de-1679904943236.jpg',
        //         org_name: 'kct',
        //         course: 'C++'
        //     })
        //     setTimeout(() => {
        //         setLoading(false)
        //     }, 0)
        // }, 2000)
    }, [isAllSet])

    const download = url => {
        fetch(url, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `${certificate.name}_${certificate.course}.png`); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
  return (
    <>
        <Header showWallet />
        <div className='p-4 flex flex-col gap-5 w-4/5 mx-auto'>
            <div className='w-[650px] mx-auto shadow-sm '>
                {loading ? <Skeleton variant='rounded' width={650} height={400} /> :
                <img src={certificate.ipfs_link} className='w-full' />
                }
            </div>
            <Box className='bg-secondary-lg rounded-md flex-1 p-4 flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    {
                        loading ?
                            <>
                                <Skeleton variant='circular' width={80} height={80} />
                                <Skeleton variant='text' width={100} />
                            </> :
                            <>
                                {certificate.org_logo ? <img src={`http://localhost:5000/logo/${certificate.org_logo}`} className='aspect-square w-[80px] rounded-full border' /> : <CorporateFareIcon className='aspect-square !w-[80px] !h-[80px] rounded-full border' />}
                                <h3 className='text-2xl text-primary'>{certificate.org_name}</h3>
                            </>
                    }
                </div>
                <Divider className='!border-secondary' />
                <div>
                    {
                        loading ?
                            <Skeleton variant='text'>
                                <p className='text-2xl text-justify'>The Certificate is offered to the <HightLightText>{certificate.name}</HightLightText> by the <HightLightText>{certificate.org_name}</HightLightText> for successfully completing the course <HightLightText>{certificate.course}</HightLightText></p>
                            </Skeleton> :
                            <p className='text-2xl text-justify'>The Certificate is offered to the <HightLightText>{certificate.name}</HightLightText> by the <HightLightText>{certificate.org_name}</HightLightText> for successfully completing the course <HightLightText>{certificate.course}</HightLightText></p>
                            
                    }
                </div>
                <Divider 
                    sx={{
                        "&::after, &::before": {
                            borderTop: "thin solid #222831"
                        }
                    }}
                >
                    <Chip label="Options" className='!text-primary' />
                </Divider>
                <div className='flex gap-3 justify-center'>
                    <IconButton onClick={download.bind(null, certificate.ipfs_link)}>
                        <DownloadForOfflineIcon className='text-primary !text-3xl' />
                    </IconButton>
                    <IconButton onClick={download.bind(null, "https://ipfs.io/ipfs/QmZyvZgtxzsFpEs72U4vZmCeA9aVizZ4Qerbg5kksdc21Q")}>
                        <ShareIcon className='text-primary !text-3xl' />
                    </IconButton>
                </div>
            </Box>
        </div>
    </>
  )
}

function HightLightText({children}) {
    return (
        <span className='text-accent italic'>{children}</span>
    )
}

export default index
