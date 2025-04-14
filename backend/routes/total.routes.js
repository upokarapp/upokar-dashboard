import { getTotalCounts } from "../controllers/total.controllers.js";
import express from 'express';
const router = express.Router();

router.get('/getTotalCounts', getTotalCounts);


export default router;