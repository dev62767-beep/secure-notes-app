const notesSchema = require('../models/notes.model');

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
module.exports= {Notes, getNotes, deleteNotes, updateNotes}