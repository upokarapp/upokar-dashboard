
import express from 'express';
const router = express.Router();

// import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getAllAmbulances, createAmbulance, deleteAmbulance } from "../controllers/ambulance.js";


router.get('/getAllAmbulances', getAllAmbulances);
router.post('/createAmbulance', createAmbulance);
router.delete('/deleteAmbulance/:id', deleteAmbulance);

export default router;

