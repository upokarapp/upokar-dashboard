
import express from 'express';
const router = express.Router();

// import { authenticateToken } from '../middlewares/auth.middleware.js';
import { uploadHospitalImage, getAllHospitals, deleteHospitalImage } from "../controllers/hospitals.js";
import { upload } from '../middlewares/hospital.js';


router.get('/getAllHospitals', getAllHospitals);
router.post('/addhospitals', upload.single('image'), uploadHospitalImage);
router.post('/deletehospitals', deleteHospitalImage);

export default router;

