import {API} from '../constants';

import axios from 'axios';

export const addDepartment = async (data) => {
    const response = await axios.post(`${API}/api/department`, data);
    return response.data;
}

export const getAllDepartments = async () => {
    const response = await axios.get(`${API}/api/department`);
    return response.data;
}

export const removeDepartment = async (id) => {
    await axios.delete(`${API}/api/department/${id}`);
}