import { Buffer } from "buffer";
import { create as ipfsHttpClient } from 'ipfs-http-client'

const INFURA_PROJECT_ID = import.meta.env.VITE_INFURA_PROJECT_ID
const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY

const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_API_KEY).toString('base64');
export const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
});
