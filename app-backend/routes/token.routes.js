import { createToken } from "../controllers/token.controller.js";
import express from "express";
const router = express.Router();

router.post("/createToken", createToken);

export default router;
