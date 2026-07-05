const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Setting = require('../models/Setting');

exports.getDashboard = async (req, res) => {
    try {
        const products = await Product.getAll();
        const orders = await Order.getAll();
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            layout: 'layouts/admin',
            productCount: products.length,
            orderCount: orders.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.render('admin/products', {
            title: 'Manage Products',
            layout: 'layouts/admin',
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddProduct = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.render('admin/add-product', {
            title: 'Add Product',
            layout: 'layouts/admin',
            categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postAddProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        const image_url = req.file ? '/images/products/' + req.file.filename : null;

        await Product.create({ name, description, price, stock, category_id, image_url });
        req.flash('success_msg', 'Product added successfully');
        res.redirect('/admin/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postDeleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        req.flash('success_msg', 'Product deleted successfully');
        res.redirect('/admin/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.render('admin/categories', {
            title: 'Manage Categories',
            layout: 'layouts/admin',
            categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postAddCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        await Category.create(name, description);
        req.flash('success_msg', 'Category added successfully');
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postDeleteCategory = async (req, res) => {
    try {
        await Category.delete(req.params.id);
        req.flash('success_msg', 'Category deleted successfully');
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.getAll();
        res.render('admin/orders', {
            title: 'Manage Orders',
            layout: 'layouts/admin',
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postUpdateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await Order.updateStatus(req.params.id, status);
        req.flash('success_msg', 'Order status updated');
        res.redirect('/admin/orders');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.getAll();
        res.render('admin/settings', {
            title: 'Manage Settings',
            layout: 'layouts/admin',
            settings
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.postSettings = async (req, res) => {
    try {
        const { site_name, contact_email, contact_phone, contact_address } = req.body;
        
        await Setting.update('site_name', site_name);
        await Setting.update('contact_email', contact_email);
        await Setting.update('contact_phone', contact_phone);
        await Setting.update('contact_address', contact_address);
        
        if (req.file) {
            const site_logo = '/images/products/' + req.file.filename; // Reusing product image directory for simplicity
            await Setting.update('site_logo', site_logo);
        }
        
        if (req.invalidateSettingsCache) {
            req.invalidateSettingsCache();
        }
        
        req.flash('success_msg', 'Settings updated successfully');
        res.redirect('/admin/settings');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
