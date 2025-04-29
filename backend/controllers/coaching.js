import { uploadToImageKit, deleteToImageKit } from "../middlewares/coaching.js"

import Coaching from "../models/coaching.js";

export const getAllCoaching = async (req, res) => {
    try {
        const response = await Coaching.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const uploadCoachingImage = async (req, res) => {
    const { centerName, contactNumber, description } = req.body;
    try {
        if (!req.file || !centerName || !contactNumber || !description) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Coaching({
            name: centerName,
            contact: contactNumber,
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


export const deleteCoachingImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Coaching.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Coaching deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
