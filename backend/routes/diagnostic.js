
import express from 'express';
const router = express.Router();

import { uploadDiagnosticImage, getAllDiagnosticID, getAllDoctors, getAllDiagnostic, deleteDiagnosticImage, deleteDoctor, addDoctorToDiagnostic, getDiagnostic } from "../controllers/diagnostic.controllers.js";
import { upload } from '../middlewares/hospital.js';


router.get('/getAllDiagnostic', getAllDiagnostic);
router.get('/getAllDiagnosticID', getAllDiagnosticID);
router.get('/getAllDoctors', getAllDoctors);
router.get('/getDiagnostic/:id', getDiagnostic);
router.post('/addDiagnostic', upload.single('image'), uploadDiagnosticImage);
router.post('/deleteDiagnostic', deleteDiagnosticImage);
router.post('/deleteDoctor', deleteDoctor);
router.post('/addDoctor', addDoctorToDiagnostic);
export default router;

