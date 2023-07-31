const { ERROR_SERVER } = require('../constant/errorHttp');
const { GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const HttpError = require('../interface/httpError');
const Invoice = require('../models/invoiceModel');

const all = async (req, res, next) => {
    try {
        const data = await Invoice.findOne();

        req.data = data;
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const allByUser = async (req, res, next) => {
    try{
        const userId = req.user?.userId?.toString();
        const data = await Invoice.find({user: userId}).populate('user').populate('order').sort('-createdAt');
        
        req.data = data;
        next();
    }catch(err){
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

module.exports = {
    all,
    allByUser
}