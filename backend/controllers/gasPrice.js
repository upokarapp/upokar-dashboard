import GasPrice from '../models/gasPrice.js';

export const setGasPrice = async (req, res) => {
    console.log(req.body);
    
    try {
        const newGasPrice = await GasPrice.updateOne(
            {}, // You can define a filter if necessary
            { $set: req.body }, // Update the values
            { upsert: true } // If no document is found, it will insert a new one
          );
        // const user = await newGasPrice.save();        
        res.status(201).json(newGasPrice);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error' });
    }
};

export const getGasPrice = async (req, res) => {

    try {

        const response = await GasPrice.find();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};