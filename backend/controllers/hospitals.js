import { uploadToImageKit, deleteToImageKit } from "../middlewares/hospital.js"

import Hospital from "../models/hospital.js";

export const getAllHospitals = async (req, res) => {
    try {
        const response = await Hospital.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Controller to add a product with images.
export const uploadHospitalImage = async (req, res) => {
    const { hospitalName, contactNumber, location, services } = req.body;
    try {
        if (!req.file || !hospitalName || !contactNumber || !location || !services) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Hospital({
            name: hospitalName,
            contact: contactNumber,
            location: location,
            services: JSON.parse(services),
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


export const deleteHospitalImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Hospital.findByIdAndDelete(req.body._id);
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

// export const deleteSliderImage = async (req, res) => {
//     try {
//         const imageId = req.body.id;
//         await deleteToImageKit(imageId);
//         await LostPerson.findByIdAndDelete(req.body._id);
//         res.status(200).json({
//             success: true,
//             message: 'Image deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };