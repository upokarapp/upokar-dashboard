import animalCareSchema from "../models/animal.model.js";

export const createAnimalCare = async (req, res) => {
    try {
        const response = await animalCareSchema.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getAnimalCare = async (req, res) => {
    try {
        const response = await animalCareSchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }    
};

export const deleteAnimalCare = async (req, res) => {
    try {
        const response = await animalCareSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}