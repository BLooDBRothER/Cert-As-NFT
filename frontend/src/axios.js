import axios from 'axios';

const axiosClient = axios.create();

const baseURL = 'http://localhost:5000/'

const endpoint = {
    login: 'api/auth/login'
}

axiosClient.defaults.baseURL = baseURL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

export async function axiosCheckLogin(){
  const res = axiosClient.get(endpoint.login);
  console.log(res);
  return res;
}

export async function axiosLogin(data){
    const res = axiosClient.post(endpoint.login, payload);
}
