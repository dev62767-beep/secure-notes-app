const express = require('express');
const authRouter = express.Router();
const {register, login} = require('../controllers/auth.controller');
const {authMiddleware} = require('../middleware/auth.middleware');

const {registerValidate, loginValidate} = require('../middleware/validation.middleware');

authRouter.post('/register', registerValidate, register);
authRouter.post('/login', loginValidate, login);
module.exports = authRouter;