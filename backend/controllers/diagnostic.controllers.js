import { uploadToImageKit, deleteToImageKit } from "../middlewares/hospital.js"

import Diagnostic from "../models/diagnostic.js";

export const getAllDiagnostic = async (req, res) => {
    try {
        const response = await Diagnostic.find().select('-doctors').sort({ _id: -1 }).lean()
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export const getAllDiagnosticID = async (req, res) => {
    try {
        const response = await Diagnostic.find().select('_id name imageUrl').sort({ _id: -1 });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDiagnostic = async (req, res) => {
    try {
        const response = await Diagnostic.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Controller to add a product with images.
export const uploadDiagnosticImage = async (req, res) => {
    const { diagnosticName, contactNumber, location, doctors } = req.body;
    console.log(req.body);

    try {
        if (!req.file || !diagnosticName || !contactNumber || !location || !doctors) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResponse = await uploadToImageKit(req.file);

        const newImage = new Diagnostic({
            name: diagnosticName,
            location: location,
            contactNumber: contactNumber,
            doctors: JSON.parse(doctors),
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

export const addDoctorToDiagnostic = async (req, res) => {
    try {
        const { diagnosticId, doctor } = req.body;

        if (!diagnosticId || !doctor) {
            return res.status(400).json({ success: false, message: 'Diagnostic ID and doctor data required' });
        }

        const diagnostic = await Diagnostic.findById(diagnosticId);
        if (!diagnostic) {
            return res.status(404).json({ success: false, message: 'Diagnostic not found' });
        }

        const requiredFields = ['name', 'specialization', 'qualifications', 'gender'];
        if (requiredFields.some(field => !doctor[field])) {
            return res.status(400).json({ success: false, message: 'All doctor fields required' });
        }

        if (!['Male', 'Female'].includes(doctor.gender)) {
            return res.status(400).json({ success: false, message: 'Invalid gender' });
        }

        if (diagnostic.doctors.length >= 10) {
            return res.status(400).json({ success: false, message: 'Max 10 doctors allowed' });
        }

        diagnostic.doctors.push(doctor);
        await diagnostic.save();

        return res.status(200).json({ success: true, message: 'Doctor added', data: diagnostic });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
export const getAllDoctors = async (req, res) => {
    try {
        const response = await Diagnostic.find().select('doctors').sort({ _id: -1 });
        // const allDoctors = response.flatMap(diagnostic => diagnostic.doctors);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteDiagnosticImage = async (req, res) => {
    try {
        const imageId = req.body.id;
        await deleteToImageKit(imageId);
        await Diagnostic.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            message: 'Diagnostic deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteDoctor = async (req, res) => {
    try {
        const { diagnosticId, doctorId } = req.body;

        // Find the diagnostic and update by pulling the doctor from the array
        const diagnostic = await Diagnostic.findByIdAndUpdate(
            diagnosticId,
            { $pull: { doctors: { _id: doctorId } } },
            { new: true, runValidators: true }
        );

        if (!diagnostic) {
            return res.status(404).json({
                success: false,
                message: 'Diagnostic not found'
            });
        }

        // Check if the doctor was actually removed (if doctorId didn't exist)
        const doctorExists = diagnostic.doctors.some(doctor => doctor._id.toString() === doctorId);
        if (doctorExists) {
            return res.status(400).json({
                success: false,
                message: 'Doctor could not be deleted'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully',
            data: diagnostic
        });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting doctor',
            error: error.message
        });
    }
};
