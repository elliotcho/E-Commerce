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