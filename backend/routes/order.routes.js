
import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getAllOrders, searchOrders, deleteOrder,order } from '../controllers/order.controllers.js';

router.get('/getAllOrders', authenticateToken, getAllOrders);
router.post('/searchOrders', authenticateToken, searchOrders);
router.post('/order', order);
router.delete('/deleteOrder/:id', authenticateToken, deleteOrder);


export default router;

