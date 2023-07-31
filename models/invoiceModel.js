const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const invoiceSchema = new Schema ({

    payment_status: {
        type: String,
        default: 'Waiting Payment'
    },

    delivery_address: {
        provinsi: {type: String, required: true},
        kabupaten: {type: String, required: true},
        kecamatan: {type: String, required: true},
        kelurahan: {type: String, required: true},
        detail: {type: String}
    },

    sub_total: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {timestamps: true});

module.exports = model('Invoice', invoiceSchema);