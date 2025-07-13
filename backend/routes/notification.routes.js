import express from "express";
import {
  createNotification,
  getAllNotification,
  deleteNotification,
} from "../controllers/notification.js";

const router = express.Router();

// Create and send a new notification
router.post("/createNotification", createNotification);

// Retrieve notifications with pagination
router.get("/getAllNotification", getAllNotification);

// Delete a notification by ID
router.delete("/deleteNotification/:id", deleteNotification);

export default router;
