import { axiosClient } from "../config.axios"

const endpoint = {
    register: 'api/auth/register',
    login: 'api/auth/login',
    verify: (token) => `api/auth/verify/${token}`,
    resend: (email) => `api/auth/resend?email=${email}`,
    logout: 'api/auth/logout',
    checkAddress: 'api/auth/check-address'
}

const settingEndpoint = {
    profile: 'api/setting/profile',
    updateProfile: 'api/setting/profile/update',
    uploadProfile: 'api/setting/profile/upload',
    removeProfile: 'api/setting/profile/delete',
    getCourse: 'api/setting/course',
    updateCourse: 'api/setting/course/update'
}


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
        console.log('in');
        const res = await axiosClient.post(endpoint.login, payload, {
            withCredentials: true,
        });
        console.log(res);
        return returnResp(res);
    } catch (errRes) {
        return returnResp(errRes.response);
    }
}

export async function axiosRegister(payload) {
    try {
        const res = await axiosClient.post(endpoint.register, payload);
        return returnResp(res);
    } catch (errRes) {
        return returnResp(errRes.response);
    }
}

export async function axiosSendMail(email) {
    try {
        const res = await axiosClient.get(endpoint.resend(email));
        return returnResp(res);
    } catch (errRes) {
        return returnResp(errRes.response);
    }
}

export async function axiosVerify(token) {
    try {
        const res = await axiosClient.get(endpoint.verify(token), {
            withCredentials: true,
        });
        console.log(res);
        return returnResp(res);
    } catch (errRes) {
        console.log(errRes);
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

export async function axiosCheckWalletAddress(payload){
    try{
        const res = await axiosClient.post(endpoint.checkAddress, payload);
        return returnResp(res);
    } catch (errRes) {
        return returnResp(errRes.response);
    }
}

// * setting endpoint

export async function axiosGetProfile(){
    try{
        const res = await axiosClient.get(settingEndpoint.profile, {
            withCredentials: true,
        })
        return returnResp(res)
    }
    catch(err){
        return returnResp(err.response);
    }
}

export async function axiosUpdateProfile(payload){
    try{
        const res = await axiosClient.post(settingEndpoint.updateProfile, payload, {
            withCredentials: true,
        })
        return returnResp(res)
    }
    catch(err){
        return returnResp(err.response);
    }
}

export async function axiosUploadProfile(payload){
    try{
        const res = await axiosClient.post(settingEndpoint.uploadProfile, payload, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return returnResp(res);
    }
    catch(err){
        return returnResp(err.response);
    }
}

export async function axiosRemoveProfile(payload){
    try{
        const res = await axiosClient.post(settingEndpoint.removeProfile, payload, {
            withCredentials: true,
        });
        return returnResp(res);
    }
    catch(err){
        return returnResp(err.response);
    }
}

export async function axiosGetCourse(){
    try{
        const res = await axiosClient.get(settingEndpoint.getCourse, {
            withCredentials: true
        });
        return returnResp(res)
    }
    catch(err){
        return returnResp(err.response);
    }
}

export async function axiosUpdateCourse(payload){
    try{
        const res = await axiosClient.post(settingEndpoint.updateCourse, payload, {
            withCredentials: true,
        })
        return returnResp(res)
    }
    catch(err){
        return returnResp(err.response);
    }
}
