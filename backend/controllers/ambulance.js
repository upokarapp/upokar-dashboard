import Ambulance from '../models/ambulance.model.js';


export const getAllAmbulances = async (req, res) => {
    try {
        const response = await Ambulance.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const createAmbulance = async (req, res) => {
    try {
        const response = await Ambulance.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteAmbulance = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const deletedAmbulance = await Ambulance.findByIdAndDelete(id);
        if (!deletedAmbulance) {
            return res.status(404).json({ message: 'Ambulance not found' });
        }
        res.status(200).json({ message: 'Ambulance deleted successfully' });
    } catch (error) {
        console.error('Error deleting ambulance:', error);
        res.status(500).json({ message: 'Server error' });
    }
}