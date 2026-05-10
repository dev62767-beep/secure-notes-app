const express = require('express');
const notesRouter = express.Router();
const {authMiddleware} = require('../middleware/auth.middleware');
const {Notes, getNotes, deleteNotes, updateNotes } = require('../controllers/notes.controller');
const {noteValidate, updateNoteValidate, deleteNoteValidate} = require('../middleware/validation.middleware');
notesRouter.post('/', noteValidate, authMiddleware, Notes);
notesRouter.get('/', authMiddleware, getNotes);
notesRouter.delete('/:id', deleteNoteValidate, authMiddleware, deleteNotes);
notesRouter.put('/:id', updateNoteValidate, authMiddleware, updateNotes);

module.exports = notesRouter;