import express from 'express';
const router = express.Router();

// Slider Images Routes
import { getAllSliderImages } from '../controllers/controller.js';
router.get('/getAllSliderImages', getAllSliderImages);


// hospital Routes
import { getAllHospitals } from "../controllers/controller.js";
router.get('/getAllHospitals', getAllHospitals);


// Ambulance Routes
import { getAllAmbulances } from "../controllers/controller.js";
router.get('/getAllAmbulances', getAllAmbulances);


// Blood Donor Routes
import { getAllDonor, createDonor } from "../controllers/controller.js";
router.get('/getAllDonor', getAllDonor);
router.post('/createDonor', createDonor);


// Pharmacy Routes
import { getPharmacy } from '../controllers/controller.js';
router.get('/getPharmacy', getPharmacy);


// Diagnostic Routes
import { getAllDiagnosticID, getDiagnostic } from "../controllers/controller.js";
router.get('/getAllDiagnosticID', getAllDiagnosticID);
router.get('/getDiagnostic/:id', getDiagnostic);



// Homio Routes
import {  getHomio } from '../controllers/controller.js';
router.get('/getHomio', getHomio);


// Animal Care Routes
import {  getAnimalCare } from '../controllers/controller.js';
router.get('/getAnimalCare', getAnimalCare);


//-------------------------------- Menu 2 ---------------------------------------------------------------


import {
    createCarOrder,
    createBusOrder,
    createTruckOrder,
    createCngOrder,
    createBikeOrder,
    createLegunaOrder,
  } from '../controllers/controller.js';
  
  // car routes
  router.post('/createCarOrder', createCarOrder);
  
  // bus routes
  router.post('/createBusOrder', createBusOrder);
  
  // truck routes
  router.post('/createTruckOrder', createTruckOrder);
  
  // cng routes
  router.post('/createCngOrder', createCngOrder);
  
  // bike routes
  router.post('/createBikeOrder', createBikeOrder);
  
  // leguna routes
  router.post('/createLegunaOrder', createLegunaOrder);
  

//-------------------------------- Menu 3 ---------------------------------------------------------------

import { getAllProducts, getProduct,order } from '../controllers/controller.js';

router.get('/products', getAllProducts);
router.get('/product/:id', getProduct);
router.post('/order', order);
//-------------------------------- Menu 4 ---------------------------------------------------------------

// Gas Price Routes
import { getGasPrice } from "../controllers/controller.js";
router.get('/getGasPrice', getGasPrice);


// Cylinder order Routes
import { createCylinderOrder } from '../controllers/controller.js';
router.post('/createCylinderOrder', createCylinderOrder);

//-------------------------------- Menu 5 ---------------------------------------------------------------

// community Routes
import { getAllCommunity } from '../controllers/controller.js'
router.get('/getAllCommunity', getAllCommunity)


// Tuitions Routes
import { getAllTuitions } from "../controllers/controller.js";
router.get('/getAllTuitions', getAllTuitions);


// Jobs Routes
import { getAllJobs } from "../controllers/controller.js";
router.get('/getAllJobs', getAllJobs);


// Labor Routes
import { createLabor } from "../controllers/controller.js";
router.post('/createLabor', createLabor);


// grocery Routes
import { getAllGrocarySliderImages } from '../controllers/controller.js';
router.get('/getAllGrocarySliderImages', getAllGrocarySliderImages);

import { createOrder } from "../controllers/controller.js";
router.post("/createGroceryOrder", createOrder);


// Kutir Shilpo Routes
import { getAllKutirShilpo, getKutirShilpo } from '../controllers/controller.js'
router.get('/getAllKutirShilpo', getAllKutirShilpo)
router.get('/getKutirShilpo/:id', getKutirShilpo)

import { createKutirOrder } from "../controllers/controller.js";
router.post('/createKutirOrder', createKutirOrder)



// Skill and IT Routes
import { getAllSkillAndIT } from '../controllers/controller.js'
router.get('/getAllSkillAndIT', getAllSkillAndIT)


// Gift Routes
import { getAllGifts, getGift } from '../controllers/controller.js'
router.get('/getAllGifts', getAllGifts)
router.get('/getGift/:id', getGift)

import { createGiftOrder } from "../controllers/controller.js";
router.post('/createGiftOrder', createGiftOrder)






export default router;