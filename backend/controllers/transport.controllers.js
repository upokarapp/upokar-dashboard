import CarOrder from '../models/Transport/car.model.js';
import BusOrder from '../models/Transport/bus.model.js';
import TruckOrder from '../models/Transport/truck.model.js';
import CngOrder from '../models/Transport/cng.model.js';
import BikeOrder from '../models/Transport/bike.model.js';
import LegunaOrder from '../models/Transport/leguna.model.js';
import CNGOrder from '../models/Transport/cng.model.js';
const createCarOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new CarOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
const createBusOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new BusOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
const createTruckOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new TruckOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
const createCngOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new CngOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
const createBikeOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new BikeOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};
const createLegunaOrder = async (req, res) => {
    console.log(req.body);

    try {
        const newOrder = new LegunaOrder(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};


// ------------------------- get all orders ---------------------------------------------------
const getAllCarOrder = async (req, res) => {
    try {
        const orders = await CarOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getAllBusOrder = async (req, res) => {
    try {
        const orders = await BusOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getAllTruckOrder = async (req, res) => {
    try {
        const orders = await TruckOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getAllCngOrder = async (req, res) => {
    try {
        const orders = await CngOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getAllBikeOrder = async (req, res) => {
    try {
        const orders = await BikeOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const getAllLegunaOrder = async (req, res) => {
    try {
        const orders = await LegunaOrder.find().sort({ _id: -1 });
        res.status(201).json(orders);  // Return the products as JSON
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

// ------------------------- delete orders ---------------------------------------------------
const deleteCarOrder = async (req, res) => {
    try {
        const orders = await CarOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
const deleteBusOrder = async (req, res) => {
    try {
        const orders = await BusOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
const deleteTruckOrder = async (req, res) => {
    try {
        const orders = await TruckOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
const deleteCngOrder = async (req, res) => {
    try {
        const orders = await CNGOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
const deleteBikeOrder = async (req, res) => {
    try {
        const orders = await BikeOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
const deleteLegunaOrder = async (req, res) => {
    try {
        const orders = await LegunaOrder.findByIdAndDelete(req.params.id);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
export { createCarOrder, createBusOrder, createTruckOrder, createCngOrder, createBikeOrder, createLegunaOrder };
export { getAllCarOrder, getAllBusOrder, getAllTruckOrder, getAllCngOrder, getAllBikeOrder, getAllLegunaOrder };
export { deleteCarOrder, deleteBusOrder, deleteTruckOrder, deleteCngOrder, deleteBikeOrder, deleteLegunaOrder };
