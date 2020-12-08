
import express from 'express';
import { 
    createProduct,  
    deleteProduct, 
    getProduct, 
    getProductsByDepartment,
    getProductImage,
    getUserProducts
} from '../controllers/product';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
// router.get('/:id', getProduct);
router.get('/image/:id', getProductImage);
router.get('/department/:dept', getProductsByDepartment);
router.get('/profile', getUserProducts);
export default router;