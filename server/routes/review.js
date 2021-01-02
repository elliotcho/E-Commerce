import express from 'express';

import{
    createReview, 
    getReviews,
    deleteReview
} from '../controllers/review';


const router = express.Router();

router.post('/', createReview);
router.get('/:productId', getReviews);
router.delete('/:productId', deleteReview);

export default router;