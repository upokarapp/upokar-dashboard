import express from 'express';
const router = express.Router();
import { createHomio, getHomio, deleteHomio } from '../controllers/homio.controllers.js';

router.post('/createHomio', createHomio);
router.get('/getHomio', getHomio);
router.delete('/deleteHomio/:id', deleteHomio);


export default router;