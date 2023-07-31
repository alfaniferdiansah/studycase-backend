const express = require('express');
const productController = require('../controllers/productController')
const uploadFileMiddleware = require('../middleware/uploadFile');
const multer  = require('multer');
const mime = require('mime');
const productMiddleware = require('../middleware/productMiddleware')

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
    }
  })
const upload = multer({ storage })

router.get('/paginate', productController.pagination);
router.get('/:pid',productMiddleware.validateById, productController.byId)
router.get('/', productController.all);
router.post('/', upload.single('image'), uploadFileMiddleware.getFileName, productController.create);
router.patch('/:pid', upload.single('image'), productMiddleware.validateById, uploadFileMiddleware.getFileName, productController.update);
router.delete('/:pid', productMiddleware.validateById, productController.destroy);


module.exports = router;