import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}, withCredentials: true};
axios.defaults.withCredentials = true;

export const register = async (data) => {
    const response = await axios.post(`${API}/api/user/register`, data, config);
    const userResponse = response.data;
    return userResponse;
}

export const login = async (data) => {
    const response = await axios.post(`${API}/api/user/login`, data, config);
    const userResponse = response.data;
    return userResponse;
}

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API}/api/user/forgot_password`, data, config);
    const { success } = response.data;
    return success;
}

export const changePassword = async (data) => {
    const response = await axios.post(`${API}/api/user/change_password`, data , config);
    const { user } = response.data;
    return user;
}