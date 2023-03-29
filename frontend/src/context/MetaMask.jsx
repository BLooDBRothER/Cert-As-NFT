import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { axiosCheckWalletAddress } from "../apis/endpoint";
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { client } from "../config.ipfs";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const metaMaskContext = createContext({});

export const useMetaMask = () => useContext(metaMaskContext);

const MetaMaskProvider = ({ children }) => {
    const [account, setAccount] = useState({
        address: null,
        isOrganization: false,
    });

    const [nft, setNFT] = useState(null);
    const [marketplace, setMarketplace] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        code: 0,
        activeStep: 0,
        isCompleted: false,
        msg: ''
    });

    const [selectedCertificate, setSelectedCertificate] = useState();

    const isAllSet = marketplace && nft;

    const loadContracts = async (signer) => {
        console.log(signer);
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketplace(marketplace)
        console.log(marketplace)
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
        setNFT(nft)
    }

    function logout() {
        setAccount({
            address: null,
            isOrganization: false,
        });
    }

    async function createNFT(dataObj, address){
        setMessage({...message, activeStep:0});
        try{
            const result = await client.add(JSON.stringify(dataObj));
            console.log(result);
            transferCertificate(result, address)
        }
        catch(error){
            setMessage({...message, activeStep:0, code: 1})
            console.log(error)
            setMessage({code: 1, msg:"Error Creating NFT"});
        }
    }

    async function transferCertificate(result, address) {
        // * Inititaing process
        const uri = `https://ipfs.io/ipfs/${result.path}`
        // * mint nft 
        setMessage({...message, activeStep:1});
        await (await nft.mint(uri)).wait()
        // * Aprroving
        setMessage({...message, activeStep:2});
        const id = await nft.tokenCount()
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait();
        // * Making and transferring
        setMessage({...message, activeStep:3});
        // add nft to marketplace
        await (await marketplace.makeCertificate(nft.address, id, address)).wait();
        setMessage('Received NFT');
        setMessage({...message, activeStep:4, isCompleted: true});
        const itemCount2 = await marketplace.itemCount()
    }

    const getSingleCertificate = async (nft_address) => {
        if(!marketplace || !nft_address) return null;
        console.log(selectedCertificate)
        const filter = marketplace.filters.certSold(selectedCertificate, null, null, null, null)
        const results = await marketplace.queryFilter(filter)
        console.log(results);
        const purchases = await Promise.all(results.map(async i => {
            i = i.args
            console.log(i)
            const uri = await nft.tokenURI(i.tokenId)
            console.log(uri);
            const response = await axios(uri)
            console.log(response)
            const metadata = response.data;
            let purchasedItem = {
                itemId: i.itemId,
                ...metadata
            }
            return purchasedItem
        }))
        return results.length ? purchases : null;
    } 

    const loadPurchasedItems = async (accountAddress) => {
        setCertificate([]);
        setLoading(true);
        if(!marketplace || !nft) return;
        const filter = marketplace.filters.certSold(null, null, null, null, account.address)
        const results = await marketplace.queryFilter(filter)
        const purchases = await Promise.all(results.map(async i => {
            i = i.args
            console.log(i)
            const uri = await nft.tokenURI(i.tokenId)
            console.log(uri);
            const response = await axios(uri)
            console.log(response)
            const metadata = response.data;
            console.log(metadata);
            let purchasedItem = {
                itemId: i.itemId,
                nft: i.nft,
                ...metadata
            }
            return purchasedItem
        }))
        setCertificate(purchases);
        setLoading(false);
    }

    async function checkOrganizationWalletAddress(address) {
        const data = {
            wallet_address: address,
        };
        const res = await axiosCheckWalletAddress(data);
        console.log(res);
        setAccount({
            address,
            isOrganization: res.data.message,
        });
    }

    async function web3Handler() {
        console.log("hi");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        checkOrganizationWalletAddress(accounts[0]);
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Set signer
        const signer = provider.getSigner();
        
        window.ethereum.on("chainChanged", (chainId) => {
            window.location.reload();
        });
        
        window.ethereum.on("accountsChanged", async function (accounts) {
            checkOrganizationWalletAddress(accounts[0]);
            await web3Handler();
        });
        loadContracts(signer)
    }

    useEffect(() => {
      web3Handler();
    }, [])

    return (
        <metaMaskContext.Provider
            value={{
                account,
                web3Handler,
                logoutMetaMask: logout,
                message,
                createNFT,
                loadPurchasedItems,
                getSingleCertificate,
                loading,
                certificate,
                isAllSet,
                selectedCertificate,
                setSelectedCertificate
            }}
        >
            {children}
        </metaMaskContext.Provider>
    );
};

export default MetaMaskProvider;
