const multer  = require('multer');
const mime = require('mime');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/products')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
//   }
// })

const getFileName = (req, res, next) => {
  if (req.file) {
    req.body[req.file.fieldname] = req.file.filename || null
  }
  return next();
}

module.exports = {
  getFileName
}