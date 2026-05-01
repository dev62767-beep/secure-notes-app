const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema({
    title: {
        ref: 'User',
        type: String,
        required: true
    },
    content: { 
        type: String,
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    username: {
        ref: 'User',
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Notes', notesSchema)