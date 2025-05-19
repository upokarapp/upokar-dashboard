import express from "express";
const router = express.Router();


import { createOrder, getAllOrders, getOrderById, searchGroceryOrder, updateOrderStatus } from "../controllers/groceryOrder.js";


router.post("/createGroceryOrder", createOrder);
router.get("/getAllGroceryOrders", getAllOrders);
router.get("/getGroceryOrder/:id", getOrderById);
router.post("/searchGroceryOrders", searchGroceryOrder);
router.put("/updateOrderStatus/:id", updateOrderStatus);

export default router;