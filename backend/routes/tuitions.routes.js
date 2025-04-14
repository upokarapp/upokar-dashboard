import { getAllTuitions, createTuition, deleteTuition } from "../controllers/tuitions.controllers.js";
import express from 'express';
const router = express.Router();

router.get('/getAllTuitions', getAllTuitions);
router.post('/createTuition', createTuition);
router.delete('/deleteTuition/:id', deleteTuition);

export default router;