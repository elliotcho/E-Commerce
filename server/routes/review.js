import express from 'express';

import{
    createReview, 
    getReviews,
    deleteReview,
    likeReview,
    checkIfUserLiked
} from '../controllers/review';


const router = express.Router();

router.post('/', createReview);
router.get('/:productId', getReviews);
router.delete('/:id', deleteReview);
router.put('/like', likeReview);
router.get('/like/:reviewId', checkIfUserLiked);

export default router;