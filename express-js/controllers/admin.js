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
    new Product(request.body.title).save();
    response.redirect('/');
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