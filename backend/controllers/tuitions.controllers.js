import Tuition from '../models/tuitions.model.js';

const getAllTuitions = async (req, res) => {

    try {
        const tuitions = await Tuition.find().sort({ _id: -1 });

        res.json(tuitions);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }

};
const createTuition = async (req, res) => {
    try {
        const tuition = await Tuition.create(req.body);
        res.status(201).json(tuition);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTuition = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Tuition.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getAllTuitions, createTuition,deleteTuition };

