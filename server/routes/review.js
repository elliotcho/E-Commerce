import express from 'express';

import{
    createReview, 
    getReviews,
    deleteReview,
    likeReview,
    checkIfUserLiked,
    dislikeReview,
    checkIfUserDisliked,
    removeLike,
    removeDislike,
    editReview
} from '../controllers/review';

const router = express.Router();

router.post('/', createReview);
router.put('/', editReview);
router.get('/:productId', getReviews);
router.delete('/:id', deleteReview);
router.put('/like', likeReview);
router.delete('/like/:reviewId', removeLike);
router.get('/like/:reviewId', checkIfUserLiked);
router.put('/dislike', dislikeReview);
router.delete('/dislike/:reviewId', removeDislike);
router.get('/dislike/:reviewId', checkIfUserDisliked);

export default router;