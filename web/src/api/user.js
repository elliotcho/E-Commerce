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