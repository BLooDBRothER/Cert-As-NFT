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

const nftContext = createContext({});

const msgInitialState = {
    code: 0,
    activeStep: 0,
    isCompleted: false,
    msg: ''
}

export const useNFT = () => useContext(nftContext);

const NFTProvider = ({ children }) => {
    const [account, setAccount] = useState({
        address: null,
        isOrganization: false,
    });

    const [nft, setNFT] = useState(null);
    const [marketplace, setMarketplace] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(msgInitialState);
    const [loadingAccount, setLoadingAccount] = useState(true);

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
        console.log(nft)
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
        setMessage({...msgInitialState});
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
        const uuid = uuidv4();
        console.log(uuid);
        await (await marketplace.makeCertificate(nft.address, id, address, uuid)).wait();
        setMessage('Received NFT');
        setMessage({...message, activeStep:4, isCompleted: true});
    }

    const reteriveCertificate = async (results) => {
        const purchases = await Promise.all(results.map(async i => {
            console.log(i)
            i = i.args
            console.log(i)
            console.log('item id - ', i.itemId)
            const uri = await nft.tokenURI(i.tokenId)
            console.log(uri);
            const response = await axios(uri)
            console.log(response)
            const metadata = response.data;
            console.log(metadata);
            let purchasedItem = {
                uuid: i.uuid,
                nft: i.nft,
                ...metadata
            }
            return purchasedItem
        }))
        return purchases
    }

    const getSingleCertificate = async (cert_uuid) => {
        if(!marketplace || !cert_uuid) return null;
        console.log('here')
        const filter = marketplace.filters.certSold(null, null, null, null, null, null, cert_uuid)
        console.log(filter)
        const results = await marketplace.queryFilter(filter)
        const purchases = await reteriveCertificate(results);
        return results.length ? purchases : null;
    }

    const loadStudentCertificate = async () => {
        setCertificate([]);
        setLoading(true);
        if(!marketplace || !nft) return;
        const filter = marketplace.filters.certSold(null, null, null, null, account.address, null, null)
        const results = await marketplace.queryFilter(filter)
        const purchases = await reteriveCertificate(results);
        setCertificate(purchases);
        setLoading(false);
    }

    const loadOrgCertificate = async () => {
        setCertificate([]);
        setLoading(true);
        if(!marketplace || !nft) return;
        const filter = marketplace.filters.certSold(null, null, null, account.address, null, null, null)
        const results = await marketplace.queryFilter(filter)
        const purchases = await reteriveCertificate(results);
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
        try{
            setLoadingAccount(true);
            console.log("hi");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            
            await checkOrganizationWalletAddress(accounts[0]);
            // Get provider from Metamask
            // console.log(window.)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider)
            
            // Set signer
            const signer = provider.getSigner();
            
            window.ethereum.on("chainChanged", (chainId) => {
                window.location.reload();
            });
            
            window.ethereum.on("accountsChanged", async function (accounts) {
                console.log('change')
                setLoadingAccount(true);                
                checkOrganizationWalletAddress(accounts[0]);
                await web3Handler();
            });
            loadContracts(signer)
            setLoadingAccount(false);
        }
        catch(err){
            const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/4gyaOZUVucMpUFpanc4hSkEX2Z-B4nIO');
            const wallet = new ethers.Wallet(import.meta.env.VITE_ETH_PRIVATE_KEY, provider);
            const signer = wallet.provider.getSigner(wallet.address);
            loadContracts(signer)
            setLoadingAccount(false);
        }
    }

    useEffect(() => {
      web3Handler();
    }, [])

    return (
        <nftContext.Provider
            value={{
                account,
                web3Handler,
                logoutMetaMask: logout,
                message,
                createNFT,
                loadStudentCertificate,
                loadOrgCertificate,
                getSingleCertificate,
                loading,
                loadingAccount,
                certificate,
                isAllSet,
                selectedCertificate,
                setSelectedCertificate
            }}
        >
            {children}
        </nftContext.Provider>
    );
};

export default NFTProvider;
