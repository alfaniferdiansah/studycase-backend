const cart = require('../models/order-itemModel');
const { ERROR_SERVER } = require('../constant/errorHttp');
const { GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const HttpError = require('../interface/httpError');

const all = async (req, res, next) => {
    try{
        const datas = await cart.find().sort('-createdAt');
        console.log(datas);
        req.data = datas
        next();
    }catch(err){
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

module.exports = {
    all
}