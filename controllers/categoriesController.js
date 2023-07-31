const Category = require('../models/categoriesModel')
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const payload = new Category({name});
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
        const data = await Category.find();
        
        req.data = data;
        next();
    }catch(err){
        console.log(err);
        const error = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(error)
    }
}

const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const data = await Category.findById(id);

        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const { name } = req.body;
    try {
        const data = await Category.findByIdAndUpdate(id, { name }, {
            new: true
        });
        
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const destroy = async (req, res, next) => {
    const id = req.params.pid;
    try {
        await Category.findByIdAndRemove(id);
        
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const pagination = async (req, res, next) => {
    try{
        let { skip = 0, limit = 10, q = ''} = req.query;

        let criteria = {};

        if(q.length){
            criteria = {
                ...criteria,
                name: {$regex: `${q}`, $options: 'i'}
            }
        }

        let count = await Category.find().countDocuments();
        let data = await Category
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        
        req.data = {
            Category: data,
            count
        };
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