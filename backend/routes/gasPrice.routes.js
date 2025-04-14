
import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getGasPrice, setGasPrice } from "../controllers/gasPrice.js";


router.get('/getGasPrice', getGasPrice);
router.post('/setGasPrice', authenticateToken, setGasPrice);



export default router;

