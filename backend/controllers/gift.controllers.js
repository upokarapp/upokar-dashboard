import { uploadToImageKit, deleteToImageKit } from "../middlewares/community.js"

import Gift from "../models/gift.model.js";

export const getAllGifts = async (req, res) => {
    const { category } = req.query;  // Get the category from the query params
    const query = category ? { category } : {};
    try {
        const response = await Gift.find(query).sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getGift = async (req, res) => {
    try {
        const response = await Gift.findById(req.params.id);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const uploadGiftImage = async (req, res) => {
    const { centerName, contactNumber, price, description, category } = req.body;
    try {
        if (!req.file || !centerName || !contactNumber || !price || !description || !category) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Gift({
            name: centerName,
            contact: contactNumber,
            price: price,
            disc: description,
            imageUrl: uploadResponse.url,
            imageId: uploadResponse.fileId,
            category: category
        });

        await newImage.save();

        res.status(201).json({
            success: true,
            data: newImage
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteGiftImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Gift.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Gift Image deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
