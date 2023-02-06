import axiosClient from "../config.axios";

const endpoint = {
  login: "api/auth/login",
  logout: "api/auth/logout",
  data: "api/admin/get-data"
};

function returnResp(res) {
  return { status: res.status, data: res.data };
}

export async function axiosCheckLogin() {
  try {
    const res = await axiosClient.get(endpoint.login, {
      withCredentials: true,
    });
    console.log(res);
    return returnResp(res);
  } catch (errRes) {
    console.log(errRes);
    return returnResp(errRes.response);
  }
}

export async function axiosLogin(payload) {
  try {
    const res = await axiosClient.post(endpoint.login, payload, {
      withCredentials: true,
    });
    return returnResp(res);
  } catch (errRes) {
    return returnResp(errRes.response);
  }
}

export async function axiosLogout() {
  try {
    const res = await axiosClient.get(endpoint.logout, {
      withCredentials: true,
    });
    return returnResp(res);
  } catch (errRes) {
    return returnResp(errRes.response);
  }
}

export async function axiosGetData(){
  try{
    const res = await axiosClient.get(endpoint.data);
    return returnResp(res);
  }
  catch(errRes){
    return returnResp(errRes.response);
  }
}
