const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { portApp, product, dbHost, hostApp } = require('../config/index');

const cartSchema = new Schema ({
    name:{
        type: String,
        minlength: [3, 'minimal karakter harus lebih dari 3'],
        required: [true, 'nama harus di isi']
    },

    qty: {
        type: Number,
        maxlength: [1000, 'Masukkan deskripsi produk (opsional)'],
        min: [1, 'minimal qty 1'],
        required: [true, 'nama harus di isi']
    },

    price: {
        type: Number,
        default: 0
    },

    image: { 
        type: String, 
        get: (data) => `${hostApp}:${portApp}/${product}`  + data
      },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }

}, {toJSON: { getters: true }, timestamps: true} )

module.exports = mongoose.model('CartItem', cartSchema)