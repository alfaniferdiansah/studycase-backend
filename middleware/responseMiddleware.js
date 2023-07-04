const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE } = require('../constant/errorCode');
const { BAD_REQUEST } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');

const response = (req, res, next) => {
    const data = req.data;
    if (!data || data.length === number.ZERO) {
        const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
        return next(error);
    }
    return res.status(number.TWO_HUNDRED).json({ message: generalMessage.SUCCESS, data});

}

module.exports = {
    response
}