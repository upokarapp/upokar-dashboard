import pharmacySchema from "../models/pharmacy.js";

export const createPharmacy = async (req, res) => {
    try {
        const response = await pharmacySchema.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getPharmacy = async (req, res) => {
    try {
        const response = await pharmacySchema.find({}).sort({ _id: -1 });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }    
};

export const deletePharmacy = async (req, res) => {
    try {
        const response = await pharmacySchema.findByIdAndDelete(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}