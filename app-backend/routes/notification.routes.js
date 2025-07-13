import express from "express";
const router = express.Router();


import { getAllNotification } from "../controllers/notification.js";


router.get("/getAllNotification", getAllNotification);



export default router;
