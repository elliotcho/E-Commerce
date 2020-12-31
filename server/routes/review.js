import express from 'express';

import{
    createReview 
} from '../controllers/review';


const router = express.Router();

router.post('/', createReview);

export default router;