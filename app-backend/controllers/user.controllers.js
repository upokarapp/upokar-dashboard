import User from '../models/user.model.js';

const signup = async (req, res) => {
    try {
        const { name, email, number, address, password } = req.body;

        const existingUser = await User.findOne({ number, email });
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

    const { _id, ...updateData } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


export { signup, login, updateUser };
