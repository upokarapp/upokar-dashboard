import express from 'express';
const router = express.Router();
// import { authenticateToken } from '../middlewares/auth.middleware.js';
import { signup, login, getAllUsers, updateUser, searchUser, deleteUser } from '../controllers/user.controllers.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/getAllUsers', getAllUsers);
router.put('/updateUser', updateUser);
router.post('/searchUser', searchUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;