import {API} from '../constants';

import axios from 'axios';

export const addDepartment = async (data) => {
    const config = {header: {}};
    const response = await axios.post(`${API}/api/department`, data, config);
    const {msg} = response.data;

    return msg; 
}