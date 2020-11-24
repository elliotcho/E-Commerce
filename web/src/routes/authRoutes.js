import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}, withCredentials: true};

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