import LaborModel from "../models/labor.model.js";

export const getAllLabor = async (req, res) => {

    try {

        const response = await LaborModel.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createLabor = async (req, res) => {

    try {

        const response = await LaborModel.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteLabor = async (req, res) => {

    const id = req.params.id;

    try {

        const product = await LaborModel.findByIdAndDelete(id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};