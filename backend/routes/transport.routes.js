import express from 'express';
const router = express.Router();

import {
  createCarOrder,
  createBusOrder,
  createTruckOrder,
  createCngOrder,
  createBikeOrder,
  createLegunaOrder,
} from '../controllers/transport.controllers.js';
import { getAllCarOrder, getAllBusOrder, getAllTruckOrder, getAllCngOrder, getAllBikeOrder, getAllLegunaOrder } from '../controllers/transport.controllers.js';
import { deleteCarOrder, deleteBusOrder, deleteTruckOrder, deleteCngOrder, deleteBikeOrder, deleteLegunaOrder } from '../controllers/transport.controllers.js';

// car routes
router.post('/createCarOrder', createCarOrder);
router.get('/getAllCarOrder', getAllCarOrder);
router.delete('/deleteCarOrder/:id', deleteCarOrder);

// bus routes
router.post('/createBusOrder', createBusOrder);
router.get('/getAllBusOrder', getAllBusOrder);
router.delete('/deleteBusOrder/:id', deleteBusOrder);

// truck routes
router.post('/createTruckOrder', createTruckOrder);
router.get('/getAllTruckOrder', getAllTruckOrder);
router.delete('/deleteTruckOrder/:id', deleteTruckOrder);

// cng routes
router.post('/createCngOrder', createCngOrder);
router.get('/getAllCngOrder', getAllCngOrder);
router.delete('/deleteCngOrder/:id', deleteCngOrder);

// bike routes
router.post('/createBikeOrder', createBikeOrder);
router.get('/getAllBikeOrder', getAllBikeOrder);
router.delete('/deleteBikeOrder/:id', deleteBikeOrder);

// leguna routes
router.post('/createLegunaOrder', createLegunaOrder);
router.get('/getAllLegunaOrder', getAllLegunaOrder);
router.delete('/deleteLegunaOrder/:id', deleteLegunaOrder);

export default router;
