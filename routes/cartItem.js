const express = require('express');
const cartItemController = require('../controllers/cartItemController')
const uploadFileMiddleware = require('../middleware/uploadFile');
const multer  = require('multer');
const mime = require('mime');
const cartItemMiddleware = require('../middleware/cartItemMiddleware')
const { authorized } = require('../middleware/passportErrorMiddleware');
const { accessValidateUser, accessValidateCartItem } = require('../middleware/accessRole');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `cartItem-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
    }
  })
const upload = multer({ storage })

router.get('/paginate/:user_id', authorized, accessValidateUser('paginate', 'CartItem'), cartItemController.pagination);
router.get('/:pid/user/:user_id', authorized, cartItemMiddleware.validateById, accessValidateUser('view', 'CartItem'), cartItemController.byId)
router.get('/:user_id', authorized, accessValidateUser('view', 'CartItem'), cartItemController.all);
router.post('/:user_id', authorized, accessValidateCartItem('create', 'CartItem'), upload.single('image'), uploadFileMiddleware.getFileName, cartItemController.create);
router.patch('/:pid/user/:user_id', authorized, accessValidateUser('update', 'CartItem'), upload.single('image'), uploadFileMiddleware.getFileName, cartItemMiddleware.validateById, cartItemController.update);
router.delete('/:pid/user/:user_id', authorized, cartItemMiddleware.validateById, accessValidateUser('delete', 'CartItem'), cartItemController.destroy);


module.exports = router;