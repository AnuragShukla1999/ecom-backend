import express from 'express';
import { getAllProduct, getProductById, updateProduct, uploadProduct } from '../controllers/product/productController.js';


const router = express.Router();

router.post('/uploadproduct', uploadProduct);
router.get('/getallproduct', getAllProduct);
router.get('/getproductbyid/:id', getProductById);
router.post('/updateproduct/:id', updateProduct);


export default router;