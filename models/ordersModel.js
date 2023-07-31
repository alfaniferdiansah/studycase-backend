const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Invoice = require('./invoiceModel')

const orderSchema = new Schema ({
    status:{
        type: String,
        default: 'waiting_payment'
    },

    delivery_fee: {
        type: Number,
        default: 0
    },

    delivery_address: {
        provinsi: {type: String, required: true},
        kabupaten: {type: String, required: true},
        kecamatan: {type: String, required: true},
        kelurahan: {type: String, required: true},
        detail: {type: String}
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    cart: [{ 
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
      }],
    
    totalPrice: {
        type: Number
    },

    sub_total:{
        type: Number
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
    paidAt:{
        type: Date,
        default: Date.now(),
        value: null
    },
    deliveredAt: {
        type: Date,
    },
}, {timestamps: true} )

orderSchema.virtual('items_count').get(function(){
    return this.cart.reduce((acc, item) => acc + parseInt(item.qty), 0);
});
orderSchema.post('save', async function(){
    let invoice = new Invoice({
        user: this.user,
        order: this._id,
        sub_total: this.sub_total,
        total: this.totalPrice,
        delivery_address: this.delivery_address,
        paymentInfo: this.paymentInfo
    })
    await invoice.save();
})

module.exports = mongoose.model('Order', orderSchema);