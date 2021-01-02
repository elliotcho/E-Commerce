import express from 'express';

import{
    createReview, 
    getReviews,
    deleteReview
} from '../controllers/review';


const router = express.Router();

router.post('/', createReview);
router.get('/:productId', getReviews);
router.delete('/:id', deleteReview);

export default router;