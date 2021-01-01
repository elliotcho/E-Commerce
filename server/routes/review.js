import express from 'express';

import{
    createReview, 
    getReviews
} from '../controllers/review';


const router = express.Router();

router.post('/', createReview);
router.get('/:productId', getReviews);

export default router;