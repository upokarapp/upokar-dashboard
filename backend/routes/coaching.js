
import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/coaching.js';
import { getAllCoaching, uploadCoachingImage, deleteCoachingImage } from '../controllers/coaching.js'

router.get('/getAllCoaching', getAllCoaching)
router.post('/addCoaching', upload.single('image'), uploadCoachingImage);
router.post('/deleteCoaching', deleteCoachingImage);







export default router;