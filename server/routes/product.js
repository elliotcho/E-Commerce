
import express from 'express';
import { createProduct,  deleteProduct } from '../controllers/product';

const router = express.Router();

router.post('/createp', createProduct);
router.delete('/deletep', deleteProduct);

export default router;