const Product = require('../models/product');

exports.getAddProduct = (request, response) => {
    response.render('admin/edit-product', {
        title:'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
};

exports.addProduct = (request, response) => {
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description = request.body.description;
    new Product(null, title, imageUrl, description, price).save();
    response.redirect('/');
};

exports.getEditProduct = (request, response) => {
    const editMode = Boolean(request.query.editing);
    if (!editMode) {
        return response.redirect('/');
    }
    const productId = request.params.productId;
    const product = Product.findById(productId);
    if(!product) {
        return response.redirect('/');
    }
    response.render('admin/edit-product', {
        title:'Add Product', 
        path: '/admin/add-product',
        editing: editMode,
        product
    });
};

exports.postEditProduct = (request, response) => {
    const product = new Product(
        request.body.id,
        request.body.title,
        request.body.imageUrl,
        request.body.description,
        +request.body.price
    );
    console.log(request.body);
    console.log(product);
    product.save();
    response.redirect(`products`);
}

exports.getProducts = (request, response) => {
    const products = Product.fetchAll();
    console.log(products);
    response.render('admin/products', { 
        products, 
        title: 'Admin Products', 
        path:'/admin/products', 
        hasProducts: products && products.length > 0,
        productCSS: true,
        activeShop: true
    });
}