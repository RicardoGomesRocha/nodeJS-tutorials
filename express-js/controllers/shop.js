const Product = require('../models/product');
const Cart = require('../models/cart')
exports.getProducts = (request, response) => {
    const products = Product.fetchAll();
    response.render('shop/product-list', { 
        products, 
        title: 'All Products', 
        path:'/products'
    });
}

exports.getProduct = (request, response) => {
    const productId = request.params.productId;
    const product = Product.findById(productId);
    response.render('shop/product-detail',  { 
        product,
        title: product.title,
        path: '/products' 
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

exports.postCart = (request, response) => {
    const productId = request.body.productId;
    const product = Product.findById(productId);
    Cart.addProduct(productId, product.price);
    response.redirect('/cart');
}

exports.getCheckout = (request, response) => {
    response.render('shop/checkout', { 
        title: 'Your cart', 
        path:'/checkout', 
    });
}

exports.getOrders = (request, response) => {
    response.render('shop/orders', { 
        title: 'Your orders', 
        path:'/orders', 
    });
}


