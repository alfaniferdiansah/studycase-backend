const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const tagSchema = new Schema ({
    name:{
        type: String,
        minlength: [3, 'minimal karakter harus lebih dari 3'],
        maxlength: [100, 'maksimal karakter harus kurang dari 100'],
        required: [true, 'nama harus di isi']
    }
}, {timestamps: true})

module.exports = mongoose.model('Tag', tagSchema)