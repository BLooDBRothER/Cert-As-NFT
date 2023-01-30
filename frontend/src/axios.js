import axios from 'axios';

const axiosClient = axios.create();

const baseURL = 'http://localhost:5000/'

const endpoint = {
    register: 'api/auth/register',
    login: 'api/auth/login',
    verify: (token) => `api/auth/verify/${token}`,
    resend: (email) => `api/auth/resend?email=${email}`,
    logout: 'api/auth/logout'
}

axiosClient.defaults.baseURL = baseURL;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

function returnResp(res){
  return {status: res.status, data: res.data}
}

export async function axiosCheckLogin(){
  try{
    const res = await axiosClient.get(endpoint.login,{
      withCredentials: true
    });
    console.log(res);
    return returnResp(res);
  }
  catch(errRes){
    console.log(errRes)
    return returnResp(errRes.response)
  }
  
}

export async function axiosLogin(payload){
  try{
    const res = await axiosClient.post(endpoint.login, payload, {
      withCredentials: true
    });
    return returnResp(res);
  }
  catch(errRes){
    return returnResp(errRes.response);
  }
}

export async function axiosRegister(payload){
  try{
    const res = await axiosClient.post(endpoint.register, payload);
    return returnResp(res);
  }
  catch(errRes){
    return returnResp(errRes.response)
  }
}

export async function axiosSendMail(email){
  try{
    const res = await axiosClient.get(endpoint.resend(email));
    return returnResp(res);
  }
  catch(errRes){
    return returnResp(errRes.response);
  }
}

export async function axiosVerify(token){
  try{
    const res = await axiosClient.get(endpoint.verify(token), {
      withCredentials: true
    });
    console.log(res);
    return returnResp(res);
  }
  catch(errRes){
    console.log(errRes)
    return returnResp(errRes.response);
  }
}

export async function axiosLogout(){
  try{
    const res = await axiosClient.get(endpoint.logout, {
      withCredentials: true
    });
    return returnResp(res);
  }
  catch(errRes){
    return returnResp(errRes.response);
  }
}
