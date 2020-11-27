
import express from 'express';
import { createProduct,  deleteProduct, getProduct, getProductInDepartment } from '../controllers/product';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
router.get('/department/:departmentId', getProductInDepartment);

export default router;