import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const createReview = async (data) => {
    const config = {headers: {'content-type': 'application/json'}};
    
    const response = await axios.post(`${API}/api/review`, data, authMiddleware(config));
    const { ok } = response.data;

    if(ok){
        authAfterware(response);
    }

    return response.data;
}

export const getReviews = async (productId) => {
    const config = {headers: {}};
    const response = await axios.get(`${API}/api/review/${productId}`, authMiddleware(config));

    authAfterware(response);
    return response.data;
}

export const deleteReview = async (productId) => {
    const config = {headers: {}};
    const response = axios.get(`${API}/api/review/${productId}`, authMiddleware(config));

    authAfterware(response);
    return response.data;
}