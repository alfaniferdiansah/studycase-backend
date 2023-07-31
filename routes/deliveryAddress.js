const express = require('express');
const deliveryAddressController = require('../controllers/deliveryAddressController');
const deliveryAddressMiddleware = require('../middleware/deliveryAddressMiddleware')
const { accessValidateUser, accessValidateDelivery } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate', authorized, accessValidateUser('detail', 'DeliveryAddress'), deliveryAddressController.pagination);
router.get('/:pid/user/:user_id', authorized, deliveryAddressMiddleware.validateById, accessValidateUser('view', 'DeliveryAddress'), deliveryAddressController.byId)

router.get('/user/:user_id', authorized, accessValidateDelivery('view', 'DeliveryAddress'), deliveryAddressController.allByUser);

router.get('/:user_id', authorized, accessValidateDelivery('detail', 'DeliveryAddress'), deliveryAddressController.all);
router.post('/:user_id', authorized, accessValidateDelivery('create', 'DeliveryAddress'), deliveryAddressController.create);
router.patch('/:pid/user/:user_id', authorized, deliveryAddressMiddleware.validateById, accessValidateUser('update', 'DeliveryAddress'), deliveryAddressController.update);
router.delete('/:pid/user/:user_id', authorized, deliveryAddressMiddleware.validateById, accessValidateUser('delete', 'DeliveryAddress'), deliveryAddressController.destroy);


module.exports = router;