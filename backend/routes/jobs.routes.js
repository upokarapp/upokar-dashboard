import { getAllJobs, createJob, deleteJob } from "../controllers/jobs.controllers.js";
import express from 'express';
const router = express.Router();

// Route to get all jobs
router.get('/getAllJobs', getAllJobs);

// Route to create a new job
router.post('/createJob', createJob);

// Route to delete a job by its ID
router.delete('/deleteJob/:id', deleteJob);

export default router;
