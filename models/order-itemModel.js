const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { portApp, product, dbHost } = require('../config/index');

const orderItemSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    qty: {
        type: Number,
        required: true
    },
    image: { 
        type: String, 
        get: (data) => `${dbHost}:${portApp}/${product}`  + data
    },
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }
});

module.exports = model('OrderItem', orderItemSchema);