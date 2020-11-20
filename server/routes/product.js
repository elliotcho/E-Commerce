
import express from 'express';
import { createProduct,  deleteProduct, getProduct } from '../controllers/product';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct)

export default router;