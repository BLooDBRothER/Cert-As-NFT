import axios from 'axios';

const axiosClient = axios.create();

const baseURL = 'http://localhost:4001/'

axiosClient.defaults.baseURL = baseURL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export default axiosClient;
