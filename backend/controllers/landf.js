import LostPerson from "../models/labdf.js";
import { uploadToImageKit, deleteToImageKit } from "../middlewares/landf.js"

export const getAllLostPerson = async (req, res) => {
    try {
        const response = await LostPerson.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// Controller to add a product with images.
export const uploadLostPersonImage = async (req, res) => {
    const { description, number } = req.body;
    try {
        if (!req.file || !description || !number) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new LostPerson({
            description: description,
            number: number,
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


export const deleteSliderImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await LostPerson.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};