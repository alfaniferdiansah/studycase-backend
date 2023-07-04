const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware')
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/paginate', authorized, accessValidate('read', 'User'), userController.paginate);
router.get('/:pid', authorized, userMiddleware.validateById, accessValidate('view', 'User'), userController.byId)
router.get('/', authorized, userController.all);
router.post('/', userController.create);
router.patch('/:pid', authorized, userMiddleware.validateById, accessValidate('update', 'User'), userController.update);
router.delete('/:pid', authorized, userMiddleware.validateById, accessValidate('delete', 'User'), userController.destroy);


module.exports = router;