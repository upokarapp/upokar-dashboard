import { uploadToImageKit, deleteToImageKit } from "../middlewares/coaching.js"

import Volunteer from "../models/volunteer.model.js";


export const getAllVolunteer = async (req, res) => {
    try {
        const response = await Volunteer.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const uploadVolunteer = async (req, res) => {
    const { name, contact, disc } = req.body;    
    try {
        if (!req.file || !name || !contact || !disc) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Volunteer({
            name: name,
            contact: contact,
            disc: disc,
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


export const deleteVolunteer = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Volunteer.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Volunteer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
