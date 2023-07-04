const express = require('express');
const orderItemsController = require('../controllers/orderItemController');
const { accessValidateOrderItems } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/:user_id', authorized, accessValidateOrderItems('view', 'OrderItems'), orderItemsController.all);

module.exports = router;