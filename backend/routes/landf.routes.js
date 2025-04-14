import express from 'express';

import {
    getAllLostPerson,
    uploadLostPersonImage,
    deleteSliderImage

} from '../controllers/landf.js';
import { upload } from '../middlewares/landf.js';

const router = express.Router();

router.get('/getAllLostPerson', getAllLostPerson);
router.post('/uploadLostPersonImage', upload.single('image'), uploadLostPersonImage);
router.post('/deleteLostPerson', deleteSliderImage);


export default router;