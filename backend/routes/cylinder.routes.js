import express from 'express';
const router = express.Router();

import { createCylinderOrder, getCylinderOrder, deleteCylinderOrder } from '../controllers/cylinder.controllers.js';

// router.get('/getAllDonor', getAllDonor);
router.get('/getCylinderOrder', getCylinderOrder);
router.post('/createCylinderOrder', createCylinderOrder);
router.delete('/deleteCylinderOrder/:id', deleteCylinderOrder);


export default router;

