import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/coaching.js';
import { getAllSkillAndIT, uploadSkillAndITImage, deleteSkillAndITImage } from '../controllers/skillandit.js'

router.get('/getAllSkillAndIT', getAllSkillAndIT)
router.post('/addAkillAndIT', upload.single('image'), uploadSkillAndITImage);
router.post('/deleteSkillAndIT', deleteSkillAndITImage);

export default router;
