import express from 'express';
const router = express.Router();

import { getAllDonor, createDonor, deleteDonor } from '../controllers/bloodDonor.controllers.js';

router.get('/getAllDonor', getAllDonor);
router.post('/createDonor', createDonor);
router.delete('/deleteDonor/:id', deleteDonor);

export default router;

