
import express from 'express';
import { createProduct,  deleteProduct } from '../controllers/product';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;