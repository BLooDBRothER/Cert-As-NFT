import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { axiosCheckWalletAddress } from "../apis/endpoint";
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { client } from "../config.ipfs";
import axios from "axios";

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

    // function test(){
    //     setMessage({...message, activeStep:0});
    //     setTimeout(() => {
    //         setMessage({...message, activeStep:1})
    //     }, 2000)
    //     setTimeout(() => {
    //         setMessage({...message, activeStep:2, code: 1})
    //     }, 5000)
    //     // setTimeout(() => {
    //     //     setMessage({...message, activeStep: 3})
    //     // }, 7000)
    // }

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
        // const itemCount = await marketplace.itemCount()
        // console.log(itemCount)
        // console.log('1st')
        const uri = `https://ipfs.io/ipfs/${result.path}`
        // * mint nft 
        setMessage({...message, activeStep:1});
        // console.log('2nd');
        await (await nft.mint(uri)).wait()
        // get tokenId of new nft 
        // console.log('3nd');
        // setMessage('Approving');
        // * Aprroving
        setMessage({...message, activeStep:2});
        const id = await nft.tokenCount()
        console.log(id)
        // approve marketplace to spend nft
        await (await nft.setApprovalForAll(marketplace.address, true)).wait()
        // console.log('approved');
        // setMessage('Getting to your Address');
        // * Making and transferring
        setMessage({...message, activeStep:3});
        // add nft to marketplace
        await (await marketplace.makeCertificate(nft.address, id, address)).wait();
        console.log('certificate made');
        // await (await marketplace.transferItem(id, address)).wait();
        console.log('transferred');
        setMessage('Received NFT');
        setMessage({...message, activeStep:4, isCompleted: true});
        const itemCount2 = await marketplace.itemCount()
        console.log(itemCount2)
    }

    const loadPurchasedItems = async (accountAddress) => {
        setCertificate([]);
        setLoading(true);
        if(!marketplace || !nft) return;
        console.log(marketplace, nft)
        const itemCount = await marketplace.itemCount()
        console.log(itemCount)
        let listedItems = []
        let soldItems = []
        console.log('in', marketplace)
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter = marketplace.filters.certSold(null, null, null, null, account.address)
        console.log(filter)
        const results = await marketplace.queryFilter(filter)
        console.log(results);
        // Fetch metadata of each nft and add that to listedItem object.
        const purchases = await Promise.all(results.map(async i => {
            // fetch arguments from each result
            i = i.args
            console.log('here', i);
            // get uri url from nft contract
            const uri = await nft.tokenURI(i.tokenId)
            // use uri to fetch the nft metadata stored on ipfs 
            console.log(uri);
            const response = await axios(uri)
            console.log(response)
            const metadata = response.data;
            let purchasedItem = {
                itemId: i.itemId,
                name: metadata.name,
                ipfs_link: metadata.ipfs_link
            }
            return purchasedItem
        }))
        console.log(purchases)
        setCertificate(purchases);
        setLoading(false);
        // console.log(purchases);
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
                loading,
                certificate
            }}
        >
            {children}
        </metaMaskContext.Provider>
    );
};

export default MetaMaskProvider;
