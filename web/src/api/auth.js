import { API } from '../constants';
import axios from 'axios';
    
export const register = async (data) => {
    const config = { headers: {'content-type': 'application/json'} };
   
    const response = await axios.post(`${API}/api/user/register`, data, config);
    const userResponse = response.data;
    const { user } = userResponse;

    if(user){
        window.localStorage.setItem('token', user.token);
        window.localStorage.setItem('refreshToken', user.refreshToken);
    }

    return userResponse;
}

export const login = async (data) => {
    const config = { headers: {'content-type': 'application/json'} };

    const response = await axios.post(`${API}/api/user/login`, data, config);
    const userResponse = response.data;
    const { user } = userResponse;

    if(user){
        window.localStorage.setItem('token', user.token);
        window.localStorage.setItem('refreshToken', user.refreshToken);
    }

    return userResponse;
}

export const forgotPassword = async (data) => {
    const config = { headers: {'content-type': 'application/json'} };
    const response = await axios.post(`${API}/api/user/forgot_password`, data, config);
    const { success } = response.data;
    return success;
}

export const changePassword = async (data) => {
    const config = { headers: {'content-type': 'application/json'} };
    const response = await axios.post(`${API}/api/user/change_password`, data , config);
    const { user } = response.data;

    if(user){
        window.localStorage.setItem('token', user.token);
        window.localStorage.setItem('refreshToken', user.refreshToken);
    }

    return response.data;
}