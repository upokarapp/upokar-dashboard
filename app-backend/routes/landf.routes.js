import express from 'express';
const router = express.Router();

import { getAllLostPerson, uploadLostPersonImage } from '../controllers/landf.js';
import { upload } from '../middlewares/landf.js';


router.get('/getAllLostPerson', getAllLostPerson);
router.post('/uploadLostPersonImage', upload.single('image'), uploadLostPersonImage);


export default router;