import axios from 'axios';

export const axiosClient = axios.create();

const baseURL = 'http://localhost:5000/'

axiosClient.defaults.baseURL = baseURL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};


