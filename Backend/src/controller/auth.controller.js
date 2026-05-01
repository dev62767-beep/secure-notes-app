const userSchema = require('../models/auth.model');
const notesSchema = require('../models/notes.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const register = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await userSchema.create({ username, email, password:bcrypt.hashSync(password, 10) });
    const token  = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET);
    res.cookie('token', token);
    
    res.status(201).json({ message: 'User registered successfully', newUser: { id: newUser._id, username: newUser.username, email: newUser.email } });
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
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.json({ message: 'Login successful', token });
    };
const Notes = async (req, res)=>{
    const {title, content} = req.body;
    const newNotes = await notesSchema.create({title, content, user:req.user._id,  username: req.user.username});
    res.status(201).json({message: 'Notes created successfully', newNotes})
}
const getNotes = async (req, res)=>{
    const notes = await notesSchema.find({user: req.user._id});
    res.status(200).json({message: 'Notes retrieved successfully', notes})
}
const deleteNotes = async (req, res)=>{
    const {id} = req.params;
    const deleted = await notesSchema.findOneAndDelete({
        _id: id,
        user: req.user._id
    });

    if (!deleted) {
        return res.status(404).json({
            message: "Note not found or unauthorized"
        });
    }
    res.status(200).json({message: 'Notes deleted successfully'})
}

const updateNotes = async (req, res)=>{
    const {id} = req.params;
    const {title, content} = req.body;
    const updated = await notesSchema.findOneAndUpdate({
        _id: id,
        user: req.user._id
    }, {title, content}, {returnDocument: 'after'});

    if (!updated) {
        return res.status(404).json({
            message: "Note not found or unauthorized"
        });
    }
    res.status(200).json({message: 'Notes updated successfully', updated})
       
    }
module.exports = { register, login, Notes, getNotes, deleteNotes, updateNotes };