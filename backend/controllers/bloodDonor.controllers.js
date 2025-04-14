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

export { getAllDonor, createDonor };

