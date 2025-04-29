import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middlewares/auth.middleware.js';
import { createKutirOrder, getAllKutirOrders, searchKutirOrders, deleteKutirOrder } from "../controllers/kutirOrder.controller.js";


router.post('/createKutirOrder', createKutirOrder)
router.get('/getAllKutirOrders', getAllKutirOrders)
router.post('/searchKutirOrders', authenticateToken, searchKutirOrders)
router.delete('/deleteKutirOrder/:id', authenticateToken, deleteKutirOrder);


export default router;
