const Product = require('../models/product');
const Cart = require('../models/cart')
exports.getProducts = async (request, response) => {
    const products = await Product.findAll();
    response.render('shop/product-list', { 
        products, 
        title: 'All Products', 
        path:'/products'
    });
}

exports.getProduct = async(request, response) => {
    const productId = request.params.productId;
    const product = await Product.findByPk(productId);
    response.render('shop/product-detail',  { 
        product,
        title: product.title,
        path: '/products' 
    });
}


exports.getIndex = async (request, response) => {
    const products = await Product.findAll();
    response.render('shop/index', { 
        products, 
        title: 'Shop', 
        path:'/'
    });
}


exports.getCart = async (request, response) => {
    const cart = Cart.fetchCart();
    const products = await Product.findAll();
    const cartProducts = [];
    for(let product of products) {
        const cartProduct = cart.products.find(p => p.id === product.id);
        if (cartProduct) {
            product.quantity = cartProduct.quantity;
            cartProducts.push(product);
        } 
    }
    response.render('shop/cart', { 
        title: 'Your cart', 
        path:'/cart', 
        products: cartProducts
    });
}

exports.postCart = async (request, response) => {
    const productId = request.body.productId;
    const product = await Product.findById(productId);
    Cart.addProduct(productId, product.price);
    response.redirect('/cart');
}

exports.getCheckout = (request, response) => {
    response.render('shop/checkout', { 
        title: 'Your cart', 
        path:'/checkout', 
    });
}

exports.postCartDeleteProduct = (request, response) => {
    const productId = request.body.productId;
    console.log(productId);
    Cart.deleteProduct(productId);
    response.redirect('/cart');
}

exports.getOrders = (request, response) => {
    response.render('shop/orders', { 
        title: 'Your orders', 
        path:'/orders', 
    });
}


