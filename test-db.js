const Product = require('./models/Product');

async function test() {
    try {
        console.log('Testing getFeatured...');
        const products = await Product.getFeatured(4);
        console.log('Success!', products);
    } catch (e) {
        console.error('Error:', e.message);
    }
    process.exit(0);
}

test();
