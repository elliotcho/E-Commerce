import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const getProfilePic = async (uid = '') => {
    const config = { headers: {}, responseType: 'blob' };

    const response = await axios.get(`${API}/api/user/profile_pic/${uid}`, authMiddleware(config));
    const imgURL = URL.createObjectURL(response.data);

    authAfterware(response);
    return imgURL;
}

export const updateProfilePic = async (data) => {
    const config = { headers: { 'content-type': 'multipart/form-data' }, responseType: 'blob' };

    const response = await axios.post(`${API}/api/user/profile_pic`, data, authMiddleware(config));
    const imgURL = URL.createObjectURL(response.data);

    authAfterware(response);
    return imgURL;
}

export const deleteProfilePic = async () => {
    const config = { headers: {}, responseType: 'blob' };
 
    const response = await axios.delete(`${API}/api/user/profile_pic`, authMiddleware(config));
    const imgURL = URL.createObjectURL(response.data);

    authAfterware(response);
    return imgURL;
}

export const loadCart = async () => {
    const config = { headers: {} };
    const response = await axios.get(`${API}/api/user/cart`, authMiddleware(config));
    const cart = response.data;

    for(let i=0; i<cart.length; i++){
        const config = { responseType: 'blob'};
        const route = `${API}/api/product/image/${cart[i].productId}`;

        const result = await axios.get(route, config);
        const imgURL = URL.createObjectURL(result.data);
        
        cart[i].image = imgURL;        
    }

    cart.sort(function(a, b) {
        if (a.name > b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
    });

    authAfterware(response);
    return cart;
}

export const deleteFromCart = async (id) => {
    const config = { headers: {} };

    const response = await axios.delete(`${API}/api/user/cart/${id}`, authMiddleware(config));
    
    authAfterware(response);
}

export const getUserInfo = async (uid = '') => {
    const config = { headers: {} };
    
    const response = await axios.get(`${API}/api/user/profile/${uid}`, authMiddleware(config));
    const info = response.data;

    authAfterware(response);
    return info;
}

export const changeUsername = async (username) => {
    const config = { headers: {} };

    const response = await axios.post(`${API}/api/user/change_username`, { username }, authMiddleware(config));
    authAfterware(response);

    return response.data;
}

export const changePassword = async(data) => {
    const config = { headers: {'content-type': 'application/json'} };
    
    const response = await axios.post(`${API}/api/user/password_settings`, data, authMiddleware(config));
    authAfterware(response);

    return response.data;
}

export const deleteAccount = async() => {
    await axios.delete(`${API}/api/user`, authMiddleware({ headers: {} }));
}

export const getAvgRating = async (uid = '') => {
    const config = { headers: {} };
    
    const response = await axios.get(`${API}/api/user/avg_rating/${uid}`, authMiddleware(config));
    const { avgRating } = response.data;

    authAfterware(response);
    return avgRating;
}

export const getSales = async (uid = '') => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/user/sales/${uid}`, authMiddleware(config));
    const { sold } = response.data;

    authAfterware(response);
    return sold;
}

export const getHistory = async () => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/user/history`, authMiddleware(config));
    const { history, ok } = response.data;

    if(ok) {
        authAfterware(response);

        for(let i=0; i<history.length; i++){
            const config = { responseType: 'blob'};
            const route = `${API}/api/product/image/${history[i].productId}`;
     
            const result = await axios.get(route, config);
            const imgURL = URL.createObjectURL(result.data);
            
            history[i].image = imgURL;        
        }

        history.sort(function(a, b) {
            if (a.datePurchased > b.datePurchased) return -1;
            if (b.datePurchased < a.datePurchased) return 1;
            return 0;
        });
    }

    return history || [];
}

export const deleteHistoryItem = async (id) => {
    const config = { headers: {} };

    
    const response = await axios.delete(`${API}/api/user/history/${id}`, authMiddleware(config));
    const { ok } = response.data;

    if(ok) {
        authAfterware(response);
    }

    return response.data;
}

export const clearHistory = async () => {
    const config = { headers: {} };

    
    const response = await axios.delete(`${API}/api/user/history`, authMiddleware(config));
    const { ok } = response.data;

    if(ok) {
        authAfterware(response);
    }

    return response.data;
}