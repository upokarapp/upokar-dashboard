import User from '../models/user.model.js';

const signup = async (req, res) => {
    try {
        const { name, email, number, address, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { number }] });
        if (existingUser) {
            return res.status(400).json({ message: 'দুঃখিত এই ইমেইল অথবা মোবাইল নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট করা আছে' });
        }

        const user = await User.create({ name, email, number, address, password });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user
const login = async (req, res) => {

    try {
        const { emailOrNumber, password } = req.body;

        if (!emailOrNumber || !password) {
            return res.status(400).json({ message: 'Please enter email/number and password' });
        }

        const user = await User.findOne({
            $or: [
                { email: emailOrNumber },
                { number: emailOrNumber }
            ]
        }).select('+password');

        if (!user || (user.password !== password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const updateUser = async (req, res) => {

    const { _id, ...updateData } = req.body;  // Assuming the ID is part of the body

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
            new: true,  // Return the updated document
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Return the updated user
        return res.status(200).json(updatedUser);
    } catch (error) {
        // Catch any errors and return them
        return res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getAllUsers = async (req, res) => {
    try {
        // Query the database to find all users
        const users = await User.find().sort({ _id: -1 });;  // This will return all users

        // Check if no users are found
        if (users.length === 0) {
            return res.status(404).send('No users found');
        }

        // Send the users as a response
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
    }
};

const searchUser = async (req, res) => {
    try {
        // Extract search parameter from query string
        const { query } = req.body;


        // Build the filter query.
        // If "search" is provided, use a case-insensitive regex match on the name field.
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { number: { $regex: query, $options: 'i' } },
                    { address: { $regex: query, $options: 'i' } },
                    // Add other fields you want to search, like phone number, etc.
                ]
            };
        }

        // Query the database for products matching the filter
        const products = await User.find(filter);

        // Send back the products data
        res.status(200).json(products);
    } catch (error) {
        // Handle any errors that occur during the query
        console.error("Error fetching products:", error);
        res.status(500).json(error.message);
    }
}
export { signup, login, updateUser, deleteUser, searchUser, getAllUsers };