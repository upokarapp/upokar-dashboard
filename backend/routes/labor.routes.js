import { getAllLabor, createLabor, deleteLabor } from "../controllers/labor.controllers.js";
import express from 'express';
const router = express.Router();

// Route to get all jobs
router.get('/getAllLabor', getAllLabor);

// Route to create a new job
router.post('/createLabor', createLabor);

// Route to delete a job by its ID
router.delete('/deleteLabor/:id', deleteLabor);

export default router;
