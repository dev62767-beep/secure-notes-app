const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

require('dotenv').config();

const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // FETCH USER
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // REAL USER OBJECT
        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

module.exports = { authMiddleware };
