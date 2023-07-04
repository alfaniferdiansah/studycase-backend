
const express = require('express');
const tagRoutes = require('../routes/tag');
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const categoryRoutes = require('../routes/category')
const cartItemRoutes = require('../routes/cartItem')
const deliveryAddressRoutes = require('../routes/deliveryAddress')
const orderRoutes = require('../routes/order')
const OrderItemsRoutes = require('../routes/orderItem')
const InvoiceRoutes = require('./invoice')
const router = express.Router();

router.use('/category', categoryRoutes);
router.use('/tag', tagRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/address', deliveryAddressRoutes);
router.use('/cartItem', cartItemRoutes);
router.use('/auth', authRoutes);
router.use('/order', orderRoutes);
router.use('/orderItems', OrderItemsRoutes);
router.use('/invoice', InvoiceRoutes);
module.exports = router;