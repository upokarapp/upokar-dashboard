import express from 'express';
import {
  getAllSliderImages,
  uploadSliderImage,
  updateSliderImage,
  deleteSliderImage
  //   getAllSliderImages,
} from '../controllers/sliderGroceryImg.js';
import { upload } from '../middlewares/sliderGrocaryImg.js';

const router = express.Router();

router.get('/getAllGrocarySliderImages', getAllSliderImages);
router.post('/slideGrocaryImages/upload', upload.single('image'), uploadSliderImage);
router.post('/slideGrocaryImages/update', upload.single('image'), updateSliderImage);
router.post('/deleteGrocarySliderImage', deleteSliderImage);


export default router;