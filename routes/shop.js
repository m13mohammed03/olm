const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');
const { isAuth } = require('../middleware/auth'); // Actually it's just module.exports = (req,res,next)
const authMiddleware = require('../middleware/auth');

// Shop
router.get('/shop', shopController.getShop);
router.get('/product/:id', shopController.getProduct);

// Cart
router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/remove/:id', cartController.removeFromCart);
router.post('/cart/update/:id', cartController.updateCart);

// Checkout & Orders
router.get('/checkout', authMiddleware, checkoutController.getCheckout);
router.post('/checkout', authMiddleware, checkoutController.postCheckout);
router.get('/orders', authMiddleware, checkoutController.getOrders);

module.exports = router;
