import React, { useState } from 'react'
import { Box, Divider, Chip, IconButton, Skeleton } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ShareIcon from '@mui/icons-material/Share';
import Header from '../../components/Header';
import { useMetaMask } from '../../context/MetaMask';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cert_img from '../../assets/c++.png'

const index = () => {
    const { getSingleCertificate, isAllSet } = useMetaMask();

    const { nft_address } = useParams();

    const [certificate, setCertificate] = useState({});
    const [loading, setLoading] = useState(true);

    const getCertificate = async () => {
        console.log('hrere', nft_address)
        const certificate = await getSingleCertificate(nft_address);
        console.log(certificate);
    }

    useEffect(() => {
        // if(!isAllSet) return
        // getCertificate()
        setTimeout(() => {
            setCertificate({
                id: 1,
                org_logo: 'http://localhost:5000/logo/13979b78-1887-4c89-ba01-0d9b863ce7de-1679904943236.jpg',
                org_name: 'kct',
                course: 'C++'
            })
            setTimeout(() => {
                setLoading(false)
            }, 0)
        }, 2000)
    }, [])

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
              link.setAttribute("download", "image.png"); //or any other extension
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
                <img src={cert_img} className='w-full' />
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
                                <img src={certificate.org_logo} className='aspect-square w-[80px] rounded-full border' />
                                <h3 className='text-2xl text-primary'>{certificate.org_name}</h3>
                            </>
                    }
                </div>
                <Divider className='!border-secondary' />
                <div>
                    {
                        loading ?
                            <Skeleton variant='text'>
                                <p className='text-2xl text-justify'>The Certificate is offered to the <HightLightText>Student</HightLightText> by the <HightLightText>KCT</HightLightText> for successfully completing the course <HightLightText>C++</HightLightText></p>
                            </Skeleton> :
                            <p className='text-2xl text-justify'>The Certificate is offered to the <HightLightText>Student</HightLightText> by the <HightLightText>KCT</HightLightText> for successfully completing the course <HightLightText>C++</HightLightText></p>
                            
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
                    <IconButton onClick={download.bind(null, "http://localhost:5173/src/assets/c++.png")}>
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
