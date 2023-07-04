const HttpError = require('../interface/httpError');
const User = require('../models/userModel');
const { hashing } = require('../utility/utility');

const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');



const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const data = await User.findById(id);
        req.data = data
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await User.find();
        req.data = data
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const paginate = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const name = req.query.name || '';
        const skip = (page - 1) * limit;
        const data = await User.find({ "name": { $regex: `${name}` } })
                    .skip(skip)
                    .limit(limit);
        const count = await User.find({ "name": { $regex: `${name}` } }).countDocuments();
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

const create = async (req, res, next) => {
    console.log(req.body);
    try {
        const hashedPassword = await hashing(req.body.password);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            role: "user",
            password: hashedPassword
        })
        const data = await user.save();
        req.data = data;
        next();
    } catch (error) {
        console.log(error);
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const hashedPassword = await hashing(req.body.password);
    const { name, username, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, username, email, password: hashedPassword}, {
            new: true
        });
        req.data = user;
        next();
    } catch (error) {
        console.log(error);
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const tagId = req.params.pid;
    try {
        await User.findByIdAndRemove(tagId);
        req.data = true;
        next();

    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    paginate,
    byId,
    all,
    create,
    update,
    destroy
}