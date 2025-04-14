import express from 'express';
const router = express.Router();
// import { authenticateToken } from '../middlewares/auth.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { createAdmin, login, allAdmin, getAdminData, adminUpdate,deleteAdmin } from '../controllers/admin.controllers.js';

// router.get('/getAllAdmin', createAdmin);

router.post('/adminLogin', login);
router.get('/getAllAdmin', authenticateToken, allAdmin);
router.get('/getAdminData', authenticateToken, getAdminData);
router.post('/adminUpdate', authenticateToken, adminUpdate);
router.post('/createAdmin', authenticateToken, createAdmin);
router.delete('/deleteAdmin/:id', authenticateToken, deleteAdmin);

export default router;