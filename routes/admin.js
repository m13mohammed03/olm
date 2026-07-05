const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/admin');
const upload = require('../middleware/upload');

router.use(adminMiddleware);

router.get('/', adminController.getDashboard);

// Products
router.get('/products', adminController.getProducts);
router.get('/products/add', adminController.getAddProduct);
router.post('/products/add', upload.single('image'), adminController.postAddProduct);
router.post('/products/delete/:id', adminController.postDeleteProduct);

// Categories
router.get('/categories', adminController.getCategories);
router.post('/categories/add', adminController.postAddCategory);
router.post('/categories/delete/:id', adminController.postDeleteCategory);

// Orders
router.get('/orders', adminController.getOrders);
router.post('/orders/update/:id', adminController.postUpdateOrderStatus);

// Settings
router.get('/settings', adminController.getSettings);
router.post('/settings', upload.single('site_logo'), adminController.postSettings);

module.exports = router;
