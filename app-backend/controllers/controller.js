// Slider Images Controller
import SliderImgSchema from "../models/sliderImg.js";
export const getAllSliderImages = async (req, res) => {
    try {
        const response = await SliderImgSchema.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// hospital Controller
import Hospital from "../models/hospital.js";
export const getAllHospitals = async (req, res) => {
    try {
        const response = await Hospital.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


// Ambulance Controller
import Ambulance from '../models/ambulance.model.js';
export const getAllAmbulances = async (req, res) => {
    try {
        const response = await Ambulance.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


// Blood Donor Controller
import bloodDonor from '../models/bloodDonor.model.js';
export const getAllDonor = async (req, res) => {
    try {
        const donners = await bloodDonor.find().sort({ _id: -1 });
        res.json(donners);  // Return the products as JSON
    } catch (error) {
        console.log(error);
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
export const createDonor = async (req, res) => {
    try {
        const newDonor = new bloodDonor(req.body);
        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Pharmacy Controller
import pharmacySchema from "../models/pharmacy.js";
export const getPharmacy = async (req, res) => {
    try {
        const response = await pharmacySchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }    
};


// Diagnostic Controller
import Diagnostic from "../models/diagnostic.js";
export const getAllDiagnosticID = async (req, res) => {
    try {
        const response = await Diagnostic.find().select('_id name imageUrl').sort({ _id: -1 });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const getDiagnostic = async (req, res) => {
    try {
        const response = await Diagnostic.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


// Homio Controller
import homioSchema from "../models/homio.model.js";
export const getHomio = async (req, res) => {
    try {
        const response = await homioSchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }    
};



// Animal Care Controller
import animalCareSchema from "../models/animal.model.js";
export const getAnimalCare = async (req, res) => {
    try {
        const response = await animalCareSchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }    
};


// ------------------------------ Menu 2 ----------------------------------------------

import CarOrder from '../models/Transport/car.model.js';
import BusOrder from '../models/Transport/bus.model.js';
import TruckOrder from '../models/Transport/truck.model.js';
import CngOrder from '../models/Transport/cng.model.js';
import BikeOrder from '../models/Transport/bike.model.js';
import LegunaOrder from '../models/Transport/leguna.model.js';
export const createCarOrder = async (req, res) => {
    try {
        const newOrder = new CarOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const createBusOrder = async (req, res) => {    
    try {
        const newOrder = new BusOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const createTruckOrder = async (req, res) => {    
    try {
        const newOrder = new TruckOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const createCngOrder = async (req, res) => {    
    try {
        const newOrder = new CngOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const createBikeOrder = async (req, res) => {    
    try {
        const newOrder = new BikeOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const createLegunaOrder = async (req, res) => {
    try {
        const newOrder = new LegunaOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// ------------------------------ Menu 3 ----------------------------------------------

import Product from '../models/product.model.js';
export const getAllProducts = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = category ? { category } : {};

  try {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limitNum);

    res.json({
      products,
      totalItems,
      totalPages,
      currentPage: pageNum,
      itemsPerPage: limitNum
    });
  } catch (error) {
        console.log(error);
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
        console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Order
import Order from '../models/order.model.js';
export const order = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

};


// ------------------------------ Menu 4 ----------------------------------------------

// Gas Price
import GasPrice from '../models/gasPrice.js';
export const getGasPrice = async (req, res) => {
    try {
        const response = await GasPrice.find();
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Cylinder order
import cylinderOrder from '../models/cylinder.model.js';
export const createCylinderOrder = async (req, res) => {

    try {
        const order = new cylinderOrder(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

};


// Community Center
import Community from "../models/communityCenter.js";
export const getAllCommunity = async (req, res) => {
    try {
        const response = await Community.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


// Tuitions
import Tuition from '../models/tuitions.model.js';
export const getAllTuitions = async (req, res) => {
    try {
        const tuitions = await Tuition.find().sort({ _id: -1 });
        res.json(tuitions);
    } catch (error) {
        console.log(error);
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Jobs
import Job from '../models/jobs.model.js';
export const getAllJobs = async (req, res) => {
    try {
        const Jobs = await Job.find().sort({ _id: -1 });
        res.json(Jobs);
    } catch (error) {
        console.log(error);
        console.error('Error fetching Jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Labor 
import LaborModel from "../models/labor.model.js";
export const createLabor = async (req, res) => {
    try {
        const response = await LaborModel.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Grocery Order
import GroceryOrder from "../models/groceryOrder.js";
export const createOrder = async (req, res) => {

    try {
        const { customer, orderItems, totalAmount } = req.body;

        // Validate products exist and get current prices
        const productIds = orderItems.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== orderItems.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more products not found'
            });
        }

        // Create order items with verified prices
        const verifiedItems = orderItems.map(item => {
            const product = products.find(p => p._id.equals(item.product));
            return {
                product: item.product,
                quantity: item.quantity,
                price: product.price
            };
        });

        const verifiedTotalAmount = verifiedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        if (verifiedTotalAmount !== totalAmount) {
            return res.status(400).json({
                success: false,
                message: 'Total amount does not match'
            });
        }

        const order = new GroceryOrder({
            customer: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address
            },
            orderItems: verifiedItems,
            totalAmount
        });

        await order.save();


        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

import SliderGrocaryImgSchema from "../models/sliderGrocaryimg.js";
export const getAllGrocarySliderImages = async (req, res) => {
    try {
        const response = await SliderGrocaryImgSchema.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Kutir Shilpo
import KutirShilpo from "../models/kutirShilpo.js";
export const getAllKutirShilpo = async (req, res) => {
    try {
        const response = await KutirShilpo.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}
export const getKutirShilpo = async (req, res) => {
    try {
        const response = await KutirShilpo.findById(req.params.id);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

import KutirOrder from '../models/kutirOrder.model.js';
export const createKutirOrder = async (req, res) => {
    try {
        const order = new KutirOrder(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Skill and IT
import SkillAndIT from "../models/skillandit.js";
export const getAllSkillAndIT = async (req, res) => {
    try {
        const response = await SkillAndIT.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


// Gift
import Gift from "../models/gift.model.js";
export const getAllGifts = async (req, res) => {
    const { category } = req.query;  // Get the category from the query params
    const query = category ? { category } : {};
    try {
        const response = await Gift.find(query).sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}
export const getGift = async (req, res) => {
    try {
        const response = await Gift.findById(req.params.id);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

import GiftOrder from '../models/giftOrder.model.js';
export const createGiftOrder = async (req, res) => {
    try {
        const order = new GiftOrder(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};