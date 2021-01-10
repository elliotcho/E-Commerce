import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const getProfilePic = async (uid = '') => {
    const config = {headers: {}, responseType: 'blob'};

    const response = await axios.get(`${API}/api/user/profile_pic/${uid}`, authMiddleware(config));
    const file = response.data;

    authAfterware(response);
    
    return URL.createObjectURL(file);
}

export const updateProfilePic = async (data) => {
    const config = {headers: {'content-type': 'multipart/form-data'}, responseType: 'blob'};

    const response = await axios.post(`${API}/api/user/profile_pic`, data, authMiddleware(config));
    const file = response.data;

    authAfterware(response);
    return URL.createObjectURL(file);
}

export const deleteProfilePic = async () => {
    const config = {headers: {}, responseType: 'blob'};

    const response = await axios.delete(`${API}/api/user/profile_pic`, authMiddleware(config));
    const file = response.data;

    authAfterware(response);

    return URL.createObjectURL(file);
}

export const loadCart = async() => {
    const config = { headers: {} };
    const response = await axios.get(`${API}/api/user/cart`, authMiddleware(config));
    const products = response.data;

    for(let i=0; i <products.length; i++){
        const config = { responseType: 'blob'};

        const result = await axios.get(`${API}/api/product/image/${products[i]._id}`, config);
        const file = result.data;
        
        products[i].image = URL.createObjectURL(file);
    }

    authAfterware(response);
    return products;
}

export const deleteFromCart = async (id) => {
    const config = {headers: {}};

    const response = await axios.delete(`${API}/api/user/cart/${id}`, authMiddleware(config));
    authAfterware(response);
}

export const getUserInfo = async (uid = '') => {
    const config = {headers: {}};
    
    const response = await axios.get(`${API}/api/user/profile/${uid}`, authMiddleware(config));
    const info = response.data;

    authAfterware(response);
    return info;
}

export const changeUsername = async (username) => {
    const config = {headers: {}};

    const response = await axios.post(`${API}/api/user/change_username`, {username}, authMiddleware(config));
    authAfterware(response);

    return response.data;
}

export const changePassword = async(data) => {
    const config = {headers: {'content-type': 'application/json'}};
    
    const response = await axios.post(`${API}/api/user/password_settings`, data, authMiddleware(config));
    authAfterware(response);

    return response.data;
}

export const deleteAccount = async() => {
    await axios.delete(`${API}/api/user`, authMiddleware({headers: {}}));
}