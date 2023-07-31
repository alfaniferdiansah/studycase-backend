const HttpError = require('../interface/httpError');
const User = require('../models/userModel');
const { DATA_NOT_FOUND_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');

const validateById = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const dataUser = await User.findById(id);
        if (!dataUser) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }
        return next()
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

module.exports = {
    validateById
}