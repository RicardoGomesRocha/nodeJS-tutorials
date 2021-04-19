const Product = require('../models/product');

exports.getAddProduct = (request, response) => {
    response.render('admin/add-product', {
        title:'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true 
    });
};

exports.addProduct = (request, response) => {
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description = request.body.description;

    new Product(title, imageUrl, description, price).save();
    response.redirect('/admin/products');
};

exports.getProducts = (request, response) => {
    const products = Product.fetchAll();
    response.render('admin/products', { 
        products, 
        title: 'Admin Products', 
        path:'/admin/products', 
        hasProducts: products && products.length > 0,
        productCSS: true,
        activeShop: true
    });
}