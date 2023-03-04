import React, { createContext, useContext, useState } from 'react'
import {ethers} from 'ethers'
import { axiosCheckWalletAddress } from '../apis/endpoint';

const metaMaskContext = createContext({});

export const useMetaMask = () => useContext(metaMaskContext);

const MetaMaskProvider = ({children}) => {
    const [account, setAccount] = useState({
      address: null,
      isOrganization: false
    });

    function logout(){
        setAccount(null);
    }

    async function checkOrganizationWalletAddress(address){
      const data = {
        wallet_address: address
      }
      const res = axiosCheckWalletAddress(data)
      setAccount({
        address,
        isOrganization: res.data.message
      });
    }

    async function web3Handler() {
        console.log('hi')
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkOrganizationWalletAddress(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
    
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        })
    
        window.ethereum.on('accountsChanged', async function (accounts) {
          checkOrganizationWalletAddress(accounts[0])
          await web3Handler()
        })
      }
  return (
    <metaMaskContext.Provider value={{
        account,
        web3Handler,
        logoutMetaMask: logout
    }}>
        {children}
    </metaMaskContext.Provider>
  )
}

export default MetaMaskProvider
