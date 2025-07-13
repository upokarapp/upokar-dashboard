import express from 'express';
import { addProduct } from '../controllers/file.controllers.js';
import { upload } from '../middlewares/file.middleware.js';

const router = express.Router();

// Route to create a product.
router.post('/addProduct', upload.array('images', 3), addProduct);


export default router;
