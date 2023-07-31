const Product = require('../models/productModel')
const User = require('../models/userModel')
const CartItem = require('../models/cartItemModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { name, qty, price, image, product } = req.body;
        
        const user = {user_id: user.userId}
        const payload = new CartItem({
            name: name,
            qty: qty,
            price: price,
            image: image,
            user: user,
            product: product
        });
        const data = await payload.save();
        
        req.data = data;
        next();
    } catch(err) {
        const error = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        next(error)
    }
}

const all = async (req, res, next) => {
    try{
        const data = await CartItem.find().populate('user').populate('product');
        
        req.data = data;
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const data = await CartItem.findById(id).populate('user').populate('product');
        
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.pid;
        const { name, qty, price, image, product } = req.body;
        
        const data = await CartItem.findByIdAndUpdate(id, {
            name: name,
            qty: qty,
            price: price,
            image: image,
            product: product
        }, { new: true });

        await data.save();
            req.data = data;
            next();
        } catch (error) {
            const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
            return next(err)
        }
}

const destroy = async (req, res, next) => {
    const id = req.params.pid;
    try {
        await CartItem.findByIdAndRemove(id);
        
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { skip = '', limit = '', page = '', q = '', user = '', product = '' } = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        if(user.length){
            let users = await user.find({name: {$in: user}});

            if(users){
                criteria = {...criteria, user: {$in: users.map(user => user._id)}};
            }
        }
        if(product.length){
            let products = await product.find({name: {$in: product}});

            if(products.length > 0){
                criteria = {...criteria, product: {$in: products.map(product => product._id)}};
            }
        }

        let count = await CartItem.find().countDocuments();
        let data = await CartItem
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .page(parseInt(page))
        .populate('user')
        .populate('product');
        
        req.data = {
            CartItem: data,
            count
        }
        next();
    }catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}


module.exports = {
    create,
    all,
    byId,
    update,
    destroy,
    pagination
}