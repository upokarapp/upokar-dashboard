
import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/community.js';
import { getAllCommunity, uploadCommunityImage, deleteCommunityImage } from '../controllers/communityCenter.js'

router.get('/getAllCommunity', getAllCommunity)
router.post('/addcommunity', upload.single('image'), uploadCommunityImage);
router.post('/deletecommunity', deleteCommunityImage);







export default router;