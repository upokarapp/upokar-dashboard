import { uploadToImageKit, deleteToImageKit } from "../middlewares/community.js"

import KutirShilpo from "../models/kutirShilpo.js";

export const getAllKutirShilpo = async (req, res) => {
    try {
        const response = await KutirShilpo.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getKutirShilpo = async (req, res) => {
    try {
        const response = await KutirShilpo.findById(req.params.id);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export const uploadKutirShilpoImage = async (req, res) => {
    const { centerName, contactNumber, price, description } = req.body;
    try {
        if (!req.file || !centerName || !contactNumber || !price || !description) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new KutirShilpo({
            name: centerName,
            contact: contactNumber,
            price: price,
            disc: description,
            imageUrl: uploadResponse.url,
            imageId: uploadResponse.fileId,

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


export const deleteKutirShilpoImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await KutirShilpo.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Kutir Shilpo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
