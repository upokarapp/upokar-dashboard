import express from 'express';
const router = express.Router();

import { createAnimalCare, getAnimalCare, deleteAnimalCare } from '../controllers/animalCare.controllers.js';

router.post('/createAnimalCare', createAnimalCare);
router.get('/getAnimalCare', getAnimalCare);
router.delete('/deleteAnimalCare/:id', deleteAnimalCare);


export default router;