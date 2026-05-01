const jwt = require('jsonwebtoken');

require('dotenv').config();
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = { _id: decoded.id, username: decoded.username };
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'})
    }
}
module.exports = {authMiddleware};