import homioSchema from "../models/homio.model.js";

export const createHomio = async (req, res) => {
    try {
        const response = await homioSchema.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getHomio = async (req, res) => {
    try {
        const response = await homioSchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }    
};

export const deleteHomio = async (req, res) => {
    try {
        const response = await homioSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}