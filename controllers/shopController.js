const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getShop = async (req, res) => {
    try {
        const categoryId = req.query.category;
        const searchQuery = req.query.search;
        let products;
        
        if (searchQuery) {
            products = await Product.search(searchQuery);
        } else if (categoryId) {
            products = await Product.getByCategory(categoryId);
        } else {
            products = await Product.getAll();
        }

        const categories = await Category.getAll();

        res.render('shop', {
            title: 'Shop - OLM SUYARI',
            products,
            categories,
            currentCategory: categoryId,
            searchQuery
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product', {
            title: product.name + ' - OLM SUYARI',
            product
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
