const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// Home Page
router.get('/', async (req, res) => {
    try {
        const featuredProducts = await Product.getFeatured(4);
        const newArrivals = await Product.getFeatured(8); // Just reusing for now
        const categories = await Category.getAll();
        
        res.render('home', {
            title: 'OLM SUYARI | Luxury Beauty',
            featuredProducts,
            newArrivals,
            categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// About Page
router.get('/about', (req, res) => {
    res.render('about', { title: 'About OLM SUYARI' });
});

// Contact Page
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
