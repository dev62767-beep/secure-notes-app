const express = require('express');
const router = express.Router();
const {register, login, Notes} = require('../controller/auth.controller');
const {authMiddleware} = require('../middleware/auth.middleware');
const { getNotes, deleteNotes, updateNotes } = require('../controller/auth.controller');
const validationMiddleware = require('../middleware/validation.middleware');

router.post('/register', validationMiddleware.registerValidate, register);
router.post('/login', validationMiddleware.loginValidate, login);
router.post('/notes', validationMiddleware.noteValidate, authMiddleware, Notes);
router.get('/notes', authMiddleware, getNotes);
router.delete('/notes/:id', validationMiddleware.deleteNoteValidate, authMiddleware, deleteNotes);
router.put('/notes/:id', validationMiddleware.updateNoteValidate, authMiddleware, updateNotes);
module.exports = router;