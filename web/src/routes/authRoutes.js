import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}, withCredentials: true};

export const register = async (data) => {
    const response = await axios.post(`${API}/api/user/register`, data, config);
    console.log(response);
    const userResponse = response.data;
    return userResponse;
}