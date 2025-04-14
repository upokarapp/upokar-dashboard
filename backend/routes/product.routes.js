import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middlewares/auth.middleware.js';

import { getAllProducts, getProduct, searchProduct, deleteProduct } from '../controllers/product.controllers.js';

router.get('/products',  getAllProducts);
router.get('/product/:id',  getProduct);
router.post('/searchProduct', authenticateToken, searchProduct);
router.delete('/deleteProduct/:id', authenticateToken, deleteProduct);


export default router;

