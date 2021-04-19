const Product = require('../models/product');

exports.getProducts = (request, response) => {
    const products = Product.fetchAll();
    response.render('shop/product-list', { 
        products, 
        title: 'All Products', 
        path:'/products'
    });
}

exports.getIndex = (request, response) => {
    const products = Product.fetchAll();
    response.render('shop/index', { 
        products, 
        title: 'Shop', 
        path:'/'
    });
}


exports.getCart = (request, response) => {
    response.render('shop/cart', { 
        title: 'Your cart', 
        path:'/cart', 
    });
}

exports.getCheckout = (request, response) => {
    response.render('shop/checkout', { 
        title: 'Your cart', 
        path:'/checkout', 
    });
}

