import cylinderOrder from '../models/cylinder.model.js';

const createCylinderOrder = async (req, res) => {

    try {
        const order = new cylinderOrder(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};
const getCylinderOrder = async (req, res) => {

    try {
        const response = await cylinderOrder.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};

const deleteCylinderOrder = async (req, res) => {
    const id = req.params.id;    
    try {
        const product = await cylinderOrder.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Cylinder Order not found' });
        }
        res.json({ message: 'Cylinder Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


export { createCylinderOrder, getCylinderOrder, deleteCylinderOrder };

