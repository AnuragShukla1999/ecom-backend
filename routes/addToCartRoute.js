import express from 'express';
import { addToCartProduct } from '../controllers/cart/addToCartProduct.js';
import { deleteAddToCartProduct } from '../controllers/cart/deleteAddToCartProduct.js';
import { updateAddToCartProduct } from '../controllers/cart/updateAddToCartProduct.js';


const router = express.Router();

router.post('/addtocart', addToCartProduct);
router.get('/deleteaddtocart', deleteAddToCartProduct);
router.get('/updateaddtocart', updateAddToCartProduct);
router.post('/addtocartview', addToCart);


export default router;