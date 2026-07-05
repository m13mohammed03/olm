const Order = require('../models/Order');

exports.getCheckout = (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) {
        req.flash('error_msg', 'Your cart is empty');
        return res.redirect('/cart');
    }

    let total = 0;
    cart.forEach(item => {
        total += item.product.price * item.quantity;
    });

    res.render('checkout', {
        title: 'Checkout - OLM SUYARI',
        cart,
        total
    });
};

exports.postCheckout = async (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) {
        return res.redirect('/cart');
    }

    const { delivery_address, phone } = req.body;
    const userId = req.session.user.id;
    
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.product.price * item.quantity;
    });

    try {
        await Order.create(userId, totalAmount, delivery_address, phone, cart);
        
        // Clear cart
        req.session.cart = [];
        
        req.flash('success_msg', 'Order placed successfully! We will contact you shortly.');
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'There was an error processing your order.');
        res.redirect('/checkout');
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const orders = await Order.getByUserId(userId);
        
        res.render('orders', {
            title: 'My Orders - OLM SUYARI',
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
