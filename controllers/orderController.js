const DeliveryAddress = require('../models/deliveryAddressModel');
const Order = require('../models/ordersModel');
const { Types } = require('mongoose');
const cartItem = require('../models/order-itemModel');
const HttpError = require('../interface/httpError');
const { GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { ERROR_SERVER } = require('../constant/errorHttp');
const { GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, statusPayment } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { delivery_address, cart, totalPrice, paymentInfo } = req.body;
        const payloadOrder = new Order({
            _id: new Types.ObjectId(),
            status: statusPayment.PROCESSING,
            delivery_address: {
                provinsi: delivery_address.provinsi,
                kabupaten: delivery_address.kabupaten,
                kecamatan: delivery_address.kecamatan,
                kelurahan: delivery_address.kelurahan,
                detail: delivery_address.detail
            },
            totalPrice: totalPrice,
            paymentInfo: paymentInfo,
            user: req.user._id 
        });
        const order = await payloadOrder.save();
        const orderItems = await cartItem.insertMany(cart);
        const orderItemsId = orderItems.map(item => item._id);
        const newOrder = await Order.findByIdAndUpdate(order._id, { order_items: orderItemsId }, {
            new: true
        });
        req.data = newOrder;
        next();
    }catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const datas = await Order.find().populate('user').populate('cart').sort('-createdAt');
        console.log(datas);
        req.data = datas
        next();
    }catch(err){
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const allByUser = async (req, res, next) => {
    try{
        const userId = req.user?.userId?.toString();
        const data = await Order.find({user: userId}).populate('user').populate('cart').sort('-createdAt');
        
        req.data = data;
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const paginate = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const name = req.query.name || '';
        const skip = (page - 1) * limit;
        const data = await Order.find({ "name": { $regex: `${name}` } })
                    .skip(parseInt(skip))
                    .limit(limit)
                    .populate('order_items')
                    .sort('-createdAt');
        const count = await Order.find({ "name": { $regex: `${name}` } }).countDocuments();
        if (data && data.length === number.ZERO) {
            req.data = null;
            next();
        }
        req.data = {
            Users: data,
            count
        };
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.pid;
    try {
        await Order.findByIdAndRemove(id);
        
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    create,
    all,
    paginate,
    destroy,
    allByUser
}