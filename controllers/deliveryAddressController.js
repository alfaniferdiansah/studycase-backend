const DeliveryAddress = require('../models/deliveryAddressModel')
const User = require('../models/userModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { nama, provinsi, kabupaten, kecamatan, kelurahan, detail, user } = req.body;

        const payload = new DeliveryAddress({
            nama: nama,
            provinsi: provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            detail: detail,
            user
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
        const data = await DeliveryAddress.find().populate('user');
        
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
        const data = await DeliveryAddress.find({user: userId}).populate('user');
        
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
        const data = await DeliveryAddress.findById(id).populate('user');
        
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
        const { nama, provinsi, kabupaten, kecamatan, kelurahan, detail } = req.body;

        const data = await DeliveryAddress.findByIdAndUpdate(id, {
            nama: nama,
            provinsi: provinsi,
            kabupaten: kabupaten,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            detail: detail
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
        await DeliveryAddress.findByIdAndRemove(id);
        
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { skip = '', limit = '', page = '', q = '', user = '' } = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        if(user.length){
            let users = await User.find({name: {$in: user}});

            if(users){
                criteria = {...criteria, user: {$in: users.map(user => user._id)}};
            }
        }

        let count = await DeliveryAddress.find().countDocuments();
        let data = await DeliveryAddress
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .page(parseInt(page))
        .populate('user');
        
        req.data = {
            DeliveryAddress: data,
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
    allByUser,
    byId,
    update,
    destroy,
    pagination
}