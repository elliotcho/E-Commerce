import {API} from '../constants';

import axios from 'axios';

export const addDepartment = async (data) => {
    const config = {header: {}};
    const response = await axios.post(`${API}/api/department`, data, config);
    return response.data;
}

export const getAllDepartments = async () => {
    const config = {header:{}};
    const response = await axios.get(`${API}/api/department`, config);
    return response.data;
}

export const removeDepartment = async (id) => {
    const config = {header:{}};
    await axios.delete(`${API}/api/department/${id}`, config);
    
}