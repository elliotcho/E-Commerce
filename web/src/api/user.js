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
    console.log(products);
    return products;
}

export const deleteFromCart = async () => {
    const config = {headers: {}};

    const response = await axios.delete(`${API}/api/user/deleteFromCart`, authMiddleware(config));
    authAfterware(response);
}
  
export const getUserInfo = async () => {
    const config = {headers: {}}

    const response = await axios.get(`${API}/api/user/profile`, authMiddleware(config));
    const info = response.data;

    authAfterware(response);
    return info;
}

export const changeUsername = async (username) => {
    const config = {headers: {}};
    const response = await axios.post(`${API}/api/user/change_username`, {username}, authMiddleware(config));
    console.log(username);
    const msg = response.data;
    authAfterware(response);
    return msg;
}

export const changePassword = async(data) => {
    console.log(data);
    const config = {headers: {'content-type': 'json/application'}};
    const res = await axios.post(`${API}/api/user/change_user_password`, data, authMiddleware(config));
    const msg = res.data;
    authAfterware(res);
    console.log(msg);
    return msg;
}

export const deleteAccount = async() => {
    
    const config = {headers: {}};
    const res = await axios.delete(`${API}/api/user`, authMiddleware(config));
    authAfterware(res);
    const msg = res.data;
    return msg;
}