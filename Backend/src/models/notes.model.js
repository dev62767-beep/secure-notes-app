const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({

    title: {
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
        type: String
    }

})

module.exports = mongoose.model('Notes', notesSchema)
