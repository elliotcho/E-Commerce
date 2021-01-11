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

export const getReviewById = async (reviewId) => {
    const response = await axios.get(`${API}/api/review/id/${reviewId}`);
    const review = response.data;

    const { user, imgURL } = await fetchUser(review.userId);
    review.username = user.username;
    review.userPic = imgURL;

    return review;
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
    const config = { headers: {} };

    const response = await axios.delete(`${API}/api/review/${id}`, authMiddleware(config));

    authAfterware(response);
}

export const updateReview = async (data) => {
    const config = { headers: {'content-type' : 'application/json' } };

    const response = await axios.put(`${API}/api/review`, data, authMiddleware(config));
    const { ok } = response.data;

    if(ok){
        authAfterware(response);
    }

    return ok;
}

export const likeReview = async (reviewId) => {
    const config = { headers: {'content-type': 'application/json'} };

    const response = await axios.put(`${API}/api/review/like`, { reviewId }, authMiddleware(config));
    
    if(response.data.ok){
        authAfterware(response);
    }

    return response.data;
}

export const removeLike = async (reviewId) => {
    const config = { headers: {'content-type': 'application/json'} };

    const response = await axios.delete(`${API}/api/review/like/${reviewId}`, authMiddleware(config));

    if(response.data.ok){
        authAfterware(response);
    }

    return response.data;
}

export const checkIfUserLiked = async (reviewId) => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/review/like/${reviewId}`, authMiddleware(config));
    authAfterware(response);

    return response.data;
}

export const dislikeReview = async (reviewId) => {
    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.put(`${API}/api/review/dislike`, { reviewId }, authMiddleware(config));

    if(response.data.ok){
        authAfterware(response);
    }

    return response.data;
}

export const removeDislike = async (reviewId) => {
    const config = { headers: {'content-type': 'application/json'} };

    const response = await axios.delete(`${API}/api/review/dislike/${reviewId}`, authMiddleware(config));

    if(response.data.ok){
        authAfterware(response);
    }

    return response.data;
}

export const checkIfUserDisliked = async (reviewId) => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/review/dislike/${reviewId}`, authMiddleware(config));
    authAfterware(response);

    return response.data;
}