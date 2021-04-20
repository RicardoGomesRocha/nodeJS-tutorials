const Product = require('../models/product');

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
    const cart = await request.user.getCart();
    const products = await cart.getProducts();
    response.render('shop/cart', { 
        title: 'Your cart', 
        path:'/cart', 
        products
    });
}

exports.postCart = async (request, response) => {
    const productId = +request.body.productId;
    const cart = await request.user.getCart();
    const products = await cart.getProducts({where: {id: productId}});
    let product;
    let quantity = 1;
    if(products && products.length > 0) {
        product = products[0];
        quantity = product.cartItem.quantity + 1;
    } else {
        const products = await request.user.getProducts({where: {id: productId}});
        product = products[0];
    }
    cart.addProduct(product, { through: { quantity} });
    response.redirect('/cart');
}

exports.getCheckout = (request, response) => {
    response.render('shop/checkout', { 
        title: 'Your cart', 
        path:'/checkout', 
    });
}

exports.postCartDeleteProduct = async(request, response) => {
    const productId = +request.body.productId;
    const cart = await request.user.getCart();
    const products = await cart.getProducts({where: {id: productId}});
    const product = products[0];
    product?.cartItem.destroy();
    response.redirect('/cart');
}

exports.postOrder = async (request, response) => {
    const cart = await request.user.getCart();
    const products = await cart.getProducts();
    const order = await request.user.createOrder();
    order.addProducts(products.map((product) => {
        product.orderItem = {
            quantity: product.cartItem.quantity
        };
        return product;
    }));
    console.log(products);
}

exports.getOrders = (request, response) => {
    response.render('shop/orders', { 
        title: 'Your orders', 
        path:'/orders', 
    });
}


