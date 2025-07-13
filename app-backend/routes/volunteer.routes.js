import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/coaching.js';
import { getAllVolunteer, uploadVolunteer, deleteVolunteer } from '../controllers/volunteer.controller.js'

router.get('/getAllVolunteer', getAllVolunteer)
router.post('/addVolunteer', upload.single('image'), uploadVolunteer);
router.post('/deleteVolunteer', deleteVolunteer);

export default router;
