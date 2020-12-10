import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const createProduct = async (data) => {
    const config = {headers: {'content-type': 'multipart/form-data'}};

    const response = await axios.post(`${API}/api/product`, data, authMiddleware(config));
    const { ok, product } = response.data

    if(ok){
        authAfterware(response);
        return product;
    }
}

export const getProductsByDepartment = async (dept) => {
    const response = await axios.get(`${API}/api/product/department/${dept}`);
    const products = response.data;

    for(let i=0;i<products.length;i++){
        const config = { responseType: 'blob'};

        const result = await axios.get(`${API}/api/product/image/${products[i]._id}`, config);
        const file = result.data;
        
        products[i].image = URL.createObjectURL(file);
    }

    return products;
}

export const getUserProducts = async () => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/product/user/profile`, authMiddleware(config));
    const products= response.data;

    for(let i=0;i<products.length;i++){
        const config = { responseType: 'blob'};

        const result = await axios.get(`${API}/api/product/image/${products[i]._id}`, config);
        const file = result.data;
        
        products[i].image = URL.createObjectURL(file);
    }
  
    authAfterware(response);
    return products;
}

export const deleteProduct = async (id) => {
    const config = {headers: {}};
        
    const response = await axios.delete(`${API}/api/product/${id}`, authMiddleware(config));

    authAfterware(response);
}   

export const getProductById = async (id) => {
    const response = await axios.get(`${API}/api/product/${id}`);
    const product = response.data;

    const result = await axios.get(`${API}/api/product/image/${id}`, {responseType: 'blob'});
    const file = result.data;
    
    product.image = URL.createObjectURL(file);
    return product;
}