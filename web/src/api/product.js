import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

const config = {headers: {'content-type': 'multipart/form-data'}};

export const createProduct = async (data) => {
    const response = await axios.post(`${API}/api/product`, data, authMiddleware(config));
    const { ok, product } = response.data

    if(ok){
        authAfterware(response);
        return product;
    }
}

export const getProductsByDepartment = () => {
    
}