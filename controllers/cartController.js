const Product = require('../models/Product');

exports.getCart = (req, res) => {
    const cart = req.session.cart || [];
    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });

    res.render('cart', {
        title: 'Shopping Cart - OLM SUYARI',
        cart,
        total
    });
};

exports.addToCart = async (req, res) => {
    const productId = req.body.product_id;
    const quantity = parseInt(req.body.quantity) || 1;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error_msg', 'Product not found');
            return res.redirect('/shop');
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const cart = req.session.cart;
        const existingItemIndex = cart.findIndex(item => item.product.id == productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }

        req.flash('success_msg', 'Product added to cart');
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.id;
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.product.id != productId);
    }
    res.redirect('/cart');
};

exports.updateCart = (req, res) => {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);

    if (req.session.cart && quantity > 0) {
        const item = req.session.cart.find(item => item.product.id == productId);
        if (item) {
            item.quantity = quantity;
        }
    }
    res.redirect('/cart');
};
