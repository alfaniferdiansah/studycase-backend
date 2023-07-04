const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const deliverySchema = new Schema ({
    nama:{
        type: String,
        required: [true, 'nama harus di isi']
    },

    provinsi:{
        type: String,
        required: [true, 'provinsi harus di isi']
    },

    kabupaten:{
        type: String,
        required: [true, 'kabupaten harus di isi']
    },
    
    kecamatan:{
        type: String,
        required: [true, 'kecamatan harus di isi']
    },

    kelurahan:{
        type: String,
        required: [true, 'kelurahan harus di isi']
    },

    detail:{
        type: String,
        required: [true, 'detail harus di isi']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true} )

module.exports = mongoose.model('DeliveryAddress', deliverySchema)