import express from 'express';
import {
  getAllSliderImages,
  uploadSliderImage,
  updateSliderImage,
  deleteSliderImage
  //   getAllSliderImages,
} from '../controllers/SliderImg.js';
import { upload } from '../middlewares/sliderImg.js';

const router = express.Router();

router.get('/getAllSliderImages', getAllSliderImages);
router.post('/slideImages/upload', upload.single('image'), uploadSliderImage);
router.post('/slideImages/update', upload.single('image'), updateSliderImage);
router.post('/deleteSliderImage', deleteSliderImage);
// router.get('/', getAllSliderImages);
// router.delete('/:id', deleteSliderImage);

export default router;