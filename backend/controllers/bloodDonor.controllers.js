import bloodDonor from '../models/bloodDonor.model.js';

const getAllDonor = async (req, res) => {
    try {
        const donners = await bloodDonor.find().sort({ _id: -1 });
        res.json(donners);  // Return the products as JSON
    } catch (error) {
        console.error('Error fetching bloodDonors:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const createDonor = async (req, res) => {
    try {
        const newDonor = new bloodDonor(req.body);
        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDonor = await bloodDonor.findByIdAndDelete(id);
        if (!deletedDonor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.status(200).json({ message: 'Donor deleted successfully' });
    } catch (error) {
        console.error('Error deleting donor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllDonor, createDonor, deleteDonor };

