import express from 'express';
import { 
    createProduct,  
    deleteProduct, 
    getProduct, 
    getProductsByDepartment,
    getProductImage,
    getUserProducts,
    searchProducts,
    setProductQuantity,
    getProductQuantities
} from '../controllers/product';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
router.get('/image/:id', getProductImage);
router.get('/quantity/:id', getProductQuantities);
router.post('/quantity', setProductQuantity);
router.get('/department/:dept', getProductsByDepartment);
router.get('/user/profile/:uid?', getUserProducts);
router.post('/search', searchProducts);

export default router;