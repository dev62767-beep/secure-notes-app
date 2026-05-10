const { body, validationResult, param } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registerValidate = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters long'),
    validate
]
const loginValidate = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
        validate
]
const noteValidate = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
    body('content')
        .notEmpty()
        .withMessage('Content is required'),
        validate
]
const updateNoteValidate = [
    body('title')
        .optional().notEmpty()
        .withMessage('Title is required'),
    body('content')
        .optional().notEmpty()
        .withMessage('Content is required'),
    validate
]
const deleteNoteValidate = [
    param('id')
        .notEmpty()
        .withMessage('ID is required'),
    validate
]

module.exports = {
    registerValidate,
    loginValidate,
    noteValidate,
    updateNoteValidate,
    deleteNoteValidate
}