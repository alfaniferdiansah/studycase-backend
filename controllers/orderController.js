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
        const { sub_total, delivery_address, cart, totalPrice, paymentInfo, delivery_fee, user } = req.body;
        console.log(req.body);
        const payloadOrder = new Order({
            _id: new Types.ObjectId(),
            status: statusPayment.WAITING_PAYMENT,
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: delivery_address.provinsi,
                kabupaten: delivery_address.kabupaten,
                kecamatan: delivery_address.kecamatan,
                kelurahan: delivery_address.kelurahan,
                detail: delivery_address.detail
            },
            sub_total: sub_total,
            totalPrice: totalPrice,
            paymentInfo: paymentInfo,
            user
        });
        const order = await payloadOrder.save();
        const orderItems = await cartItem.insertMany(cart.map(item => ({
            name: item.name,
            description: item.description,
            price: parseInt(item.price),
            qty: parseInt(item.qty),
            image: item.image,
            order: order._id
        })));
        const orderItemsId = orderItems.map(item => item._id);
        const newOrder = await Order.findByIdAndUpdate(order._id, { cart: orderItemsId }, {
            new: true
        });
        req.data = newOrder;
        next();
    }catch(err) {
        console.log(err)
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