import React, { useEffect } from 'react'
import { useMetaMask } from '../../context/MetaMask'

const ShowCertificate = () => {
    const {loading, certificate, loadPurchasedItems} = useMetaMask();

    useEffect(() => {
        loadPurchasedItems();
    }, []);

    useEffect(() => {console.log(certificate)}, [certificate])

  return (
    <div>
        <h1>Your Certificate</h1>
        <div className='flex gap-2 flex-wrap p-2'>
            {certificate.map((cert) => (
                <div key={cert.id} className='w-[300px] bg-secondary-lg p-2 rounded-md flex flex-col justify-evenly items-center'>
                    <img src={cert.ipfs_link} className='w-full' />
                    <h3>{cert.name}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ShowCertificate
