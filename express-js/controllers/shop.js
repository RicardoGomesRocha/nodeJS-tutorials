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
    const product = await Product.findById(productId);
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
    const products = await request.user.getCartItems();
    response.render('shop/cart', { 
        title: 'Your cart', 
        path:'/cart', 
        products
    });
}

exports.postCart = async (request, response) => {
    const productId = request.body.productId;
    const product = await Product.findById(productId);
    await request.user.addToCart(product);
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
    cart.setProducts(null);
    response.redirect('/orders');
}

exports.getOrders = async (request, response) => {
    const orders = await request.user.getOrders({include:['products']});
    orders.forEach((order) => console.log(order));
    response.render('shop/orders', { 
        title: 'Your orders', 
        path:'/orders',
        orders
    });
}


