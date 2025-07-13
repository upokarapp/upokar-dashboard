import { getAllToken, deleteTokens } from "../controllers/token.controller.js";
import express from "express";
const router = express.Router();

router.get("/getAllToken", getAllToken);
router.delete("/deleteTokens", deleteTokens);

export default router;
