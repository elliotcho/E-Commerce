import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import { fetchUser } from '../utils/fetchUser';
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
    const response = await axios.get(`${API}/api/review/${productId}`);
    const reviews = response.data;

    for(let i=0;i<reviews.length;i++){
        const { userId } = reviews[i];

        const { user, imgURL } = await fetchUser(userId);

        reviews[i].username = user.username;
        reviews[i].userPic = imgURL;
    }

    return reviews;
}

export const deleteReview = async (id) => {
    const config = {headers: {}}

    const response = await axios.delete(`${API}/api/review/${id}`, authMiddleware(config));

    authAfterware(response);
}