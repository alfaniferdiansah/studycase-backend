const { defineAbilityFor } = require('../utility/utility');
const { UNAUTHORIZED_USER } = require('../constant/errorMessage');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const { UNAUTHORIZED } = require('../constant/errorHttp');
const HttpError = require('../interface/httpError');
const { User, DeliveryAddress, CartItem, Order, Invoice, OrderItems } = require('../interface/user');
const { ObjectId } = require('bson');


const accessValidate = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.pid
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new User({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateUser = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new User({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateDelivery = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new DeliveryAddress({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateCartItem = (action, subject) => {
    return async (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new CartItem({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateOrder = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.pid
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new Order({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            console.log(error);
            return next(error);
        }
        return next()
    }
}

const accessValidateInvoice = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new Invoice({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

const accessValidateOrderItems = (action, subject) => {
    return (req, res, next) => {
        const id = req.params.user_id
        console.log(id);
        const authorized = defineAbilityFor(req.user);
        let isAuthorized
        if (id) {
            const userAccess = new OrderItems({ user_id: new ObjectId(id) })
            isAuthorized = authorized.can(action, userAccess)
        } else {
            isAuthorized = authorized.can(action, subject)
        }
        if (!isAuthorized) {
            const error = new HttpError(UNAUTHORIZED_USER, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
        }
        return next()
    }
}

module.exports = {
    accessValidate,
    accessValidateUser,
    accessValidateDelivery,
    accessValidateCartItem,
    accessValidateOrder,
    accessValidateInvoice,
    accessValidateOrderItems
}