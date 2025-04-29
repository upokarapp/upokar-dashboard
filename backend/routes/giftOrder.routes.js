import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middlewares/auth.middleware.js';
import { createGiftOrder, getAllGiftOrders, searchGiftOrders, deleteGiftOrder } from "../controllers/giftOrder.controller.js";


router.post('/createGiftOrder', createGiftOrder)
router.get('/getAllGiftOrders', authenticateToken, getAllGiftOrders)
router.post('/searchGiftOrders', authenticateToken, searchGiftOrders)
router.delete('/deleteGiftOrder/:id', authenticateToken, deleteGiftOrder);


export default router;
