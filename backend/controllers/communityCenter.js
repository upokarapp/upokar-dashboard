import { uploadToImageKit, deleteToImageKit } from "../middlewares/community.js"

import Community from "../models/communityCenter.js";

export const getAllCommunity = async (req, res) => {
    try {
        const response = await Community.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


export const uploadCommunityImage = async (req, res) => {
    const { centerName, contactNumber, location, description } = req.body;
    try {
        if (!req.file || !centerName || !contactNumber || !location || !description) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Community({
            name: centerName,
            contact: contactNumber,
            location: location,
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


export const deleteCommunityImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Community.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Hospital deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
