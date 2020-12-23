import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';


export const getProfilePic = async () => {
    const config = {headers: {}, responseType: 'blob'};

    const response = await axios.get(`${API}/api/user/profile_pic`, authMiddleware(config));
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
    const config = {headers: {}};
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

    const response = await axios.delete(`${API}/api/user/deleteFromCart/${id}`, authMiddleware(config));
    authAfterware(response);
}
  
export const getMe = async () => {
    const config = {headers: {}}

    const response = await axios.get(`${API}/api/user/me`, authMiddleware(config));
    const info = response.data;

    authAfterware(response);
    return info;
}

export const getUserInfo = async (uid) => {
    const response = await axios.get(`${API}/api/user/profile/${uid}`);
    const info = response.data;
    return info;
}