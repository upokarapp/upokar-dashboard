import express from 'express';
const router = express.Router();
import { signup, login, updateUser } from '../controllers/user.controllers.js';

router.post('/signup', signup);
router.post('/login', login);
router.put('/updateUser', updateUser);

export default router;  