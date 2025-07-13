import LostPerson from "../models/labdf.js";
import { uploadToImageKit } from "../middlewares/landf.js"

export const getAllLostPerson = async (req, res) => {
    try {
        const response = await LostPerson.find().sort({ _id: -1 });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

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

