import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const createProduct = async (data) => {
    const config = { headers: { 'content-type': 'multipart/form-data' } };

    const response = await axios.post(`${API}/api/product`, data, authMiddleware(config));
    const { ok, product } = response.data

    if(ok){
        authAfterware(response);
        return product;
    }
} 

export const updateProductQuantity = async (productId, quantity) => {
    const config = { headers: { 'content-type' : 'application/json' } };
    const data = { productId };
    
    let sizes = ['XS', 'S', 'M', 'L', 'XL'];

    sizes.forEach(s => data[s] = quantity[s] || 0);

    const response = await axios.post(`${API}/api/product/quantity`, data, authMiddleware(config));
    const { ok } = response.data;

    if(ok){
        authAfterware(response);
    }

    return ok;
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

export const getUserProducts = async (uid = '') => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/product/user/profile/${uid}`, authMiddleware(config));
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

    if(!product){
        return null;
    }

    const userInfo = await axios.get(`${API}/api/user/profile/${product.userId}`);
    const { username } = userInfo.data;

    const result = await axios.get(`${API}/api/product/image/${id}`, {responseType: 'blob'});
    const file = result.data;
    
    product.image = URL.createObjectURL(file);
    product.username = username;

    return product;
}

export const getProductQuantities = async (productId) => {
    const response = await axios.get(`${API}/api/product/quantity/${productId}`);
    const sizes = response.data;

    const cache = {};

    for(let i=0;i<sizes.length;i++){
        const size = sizes[i];
        const { name, quantity } = size;

        cache[name] = quantity;
    }

    return cache;
}

export const addToUserCart = async (data) =>{
    const config = { headers: {'content-type': 'application/json'} };
    const response = await axios.post(`${API}/api/user/cart`, data, authMiddleware(config));
    authAfterware(response);
}

export const searchProducts = async (data) => {
    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post(`${API}/api/product/search`, data, config);
    const products = response.data;

    for(let i=0;i<products.length;i++){
        const config = { responseType: 'blob'};

        const result = await axios.get(`${API}/api/product/image/${products[i]._id}`, config);
        const file = result.data;
        
        products[i].image = URL.createObjectURL(file);
    }

    return products;
}