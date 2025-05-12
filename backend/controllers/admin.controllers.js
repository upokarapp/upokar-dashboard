import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {

    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: 'Please enter name and password' });
        }

        const admin = await Admin.findOne({ name: name });

        if (!admin || (admin.password !== password)) {
            return res.status(401).json({ message: 'Invalid credentialsss' });
        }
        const token = jwt.sign(
            { userName: admin.name, type: admin.type, id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
        res
            .cookie("access_token", token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production', // Only secure in production
                secure: true
            })
            .status(200)
            .json({
                name: admin.name,
                type: admin.type,
            });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAdminData = async (req, res) => {
    const { id } = req.user;

    try {
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: 'Admin not found' });
    }
}
const adminUpdate = async (req, res) => {
    const { id } = req.user;
    const { currentPassword, newPassword, username } = req.body;
    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Please enter name and password' });
    }
    try {
        const admin = await Admin.findById(id);
        if (admin.password != currentPassword) return res.status(401).json({ message: 'Invalid credentialsss' });
        const updatedUser = await Admin.findByIdAndUpdate(id, { name: username, password: newPassword }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: 'Admin not found' });
    }
}
// Controller for creating a new admin

// Controller to get all admins
const allAdmin = async (req, res) => {

    try {
        const admin = await Admin.findById(req.user.id);
        if (admin.type !== 'main') {
            return res.status(403).json({ message: 'You are not authorized to view this resource' });
        }
        const admins = await Admin.find({ type: 'sub' }).sort({ _id: -1 });

        res.json(admins);

    } catch (error) {
        console.error('Error fetching all admins:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error while fetching admins' });
    }
};
const createAdmin = async (req, res) => {
    try {
        const { name, password } = req.body;
        const admin = await Admin.findById(req.user.id);
        if (admin.type !== 'main') {
            return res.status(403).json({ message: 'You are not authorized to view this resource' });
        }
        if (!name || !password) {
            return res.status(400).json({ message: 'Please enter name and password for the admin' });
        }

        // Check if an admin with this name already exists
        const existingAdmin = await Admin.findOne({ name: name, password: 'password' });

        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this name already exists' }); // 409 Conflict
        }

        const newAdmin = new Admin({
            name,
            password,
            type: 'sub' // Assign type 'admin'
        });

        await newAdmin.save(); // Save the new admin to the database

        res.status(201).json({ // 201 Created status for successful resource creation
            message: 'Admin created successfully',
            admin: {
                _id: newAdmin.id,
                name: newAdmin.name,
                type: newAdmin.type
            }
        });

    } catch (error) {
        console.error('Error creating admin:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error while creating admin' });
    }
};

const deleteAdmin = async (req, res) => {
    const id = req.params.id;

    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { createAdmin, login, getAdminData, adminUpdate, allAdmin, deleteAdmin };
