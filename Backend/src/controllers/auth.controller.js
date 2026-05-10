const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const register = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await userSchema.create({ username, email, password:bcrypt.hashSync(password, 10), role: "user" });
    const token  = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET);
    res.cookie('token', token);
    
    res.status(201).json({ message: 'User registered successfully', newUser: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role } });
}

const login = async (req, res) => {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong password, please try again' });
        }
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
            });
    };

module.exports = { register, login,  };