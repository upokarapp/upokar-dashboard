import express from 'express';
const router = express.Router();
import { createPharmacy, getPharmacy, deletePharmacy } from '../controllers/pharmacy.controllers.js';

router.post('/createPharmacy', createPharmacy);
router.get('/getPharmacy', getPharmacy);
router.delete('/deletePharmacy/:id', deletePharmacy);

export default router;