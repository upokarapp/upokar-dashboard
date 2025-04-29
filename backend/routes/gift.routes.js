
import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/community.js';
import { getAllGifts, uploadGiftImage, deleteGiftImage, getGift } from '../controllers/gift.controllers.js'

router.get('/getAllGifts', getAllGifts)
router.get('/getGift/:id', getGift)
router.post('/addGift', upload.single('image'), uploadGiftImage);
router.post('/deleteGift', deleteGiftImage);







export default router;
