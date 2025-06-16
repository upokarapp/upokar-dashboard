
import express from 'express';
const router = express.Router();

import { upload } from '../middlewares/community.js';
import { getAllKutirShilpo, getKutirShilpo, uploadKutirShilpoImage, deleteKutirShilpoImage, updateKutirShilpo } from '../controllers/KutirShilpo.js'

router.get('/getAllKutirShilpo', getAllKutirShilpo)
router.get('/getKutirShilpo/:id', getKutirShilpo)
router.put('/updateKutirShilpo/:id', updateKutirShilpo)
router.post('/addkutirshilpo', upload.single('image'), uploadKutirShilpoImage);
router.post('/deletekutirshilpo', deleteKutirShilpoImage);







export default router;