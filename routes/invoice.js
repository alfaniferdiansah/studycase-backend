const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { accessValidateInvoice } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportErrorMiddleware');
const router = express.Router();


router.get('/:user_id', authorized, accessValidateInvoice('view', 'Invoice'), invoiceController.all);

router.get('/user/:user_id', authorized, accessValidateInvoice('view', 'Invoice'), invoiceController.allByUser);
module.exports = router;