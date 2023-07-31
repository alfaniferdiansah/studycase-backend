const express = require('express');
const orderController = require('../controllers/orderController');
const orderMiddleware = require('../middleware/orderMiddleware');
const { accessValidateUser, accessValidateOrder } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate/:user_id', authorized, accessValidateUser('paginate', 'Order'), orderController.paginate);
router.get('/:pid', authorized, accessValidateOrder('view', 'Order'), orderController.all);
router.post('/:user_id', authorized, accessValidateOrder('create', 'Order'), orderController.create);
router.delete('/:pid/user/:user_id', authorized, orderMiddleware.validateById, accessValidateUser('delete', 'Order'), orderController.destroy);

router.get('/user/:pid', authorized, accessValidateOrder('view', 'Order'), orderController.allByUser);

module.exports = router;