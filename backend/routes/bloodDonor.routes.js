import express from 'express';
const router = express.Router();

import { getAllDonor, createDonor } from '../controllers/bloodDonor.controllers.js';

router.get('/getAllDonor', getAllDonor);
router.post('/createDonor', createDonor);


export default router;

