const Product = require('../models/product');

exports.getAddProduct = (request, response) => {
    response.render('admin/edit-product', {
        title:'Add Product', 
        path: '/admin/add-product',
        editing: false
    });
};

exports.addProduct = async(request, response) => {
    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description = request.body.description;
    try {
        await new Product({title, price, description, imageUrl}).save();
    }catch(error) {
        console.error(error);
    }

    response.redirect('/admin/products');
};

exports.getEditProduct = async(request, response) => {
    const editMode = Boolean(request.query.editing);
    if (!editMode) {
        return response.redirect('/');
    }
    const productId = request.params.productId;
    const product = await Product.findById(productId);
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

exports.postEditProduct = async(request, response) => {
    const product = await Product.findById(request.body.id);
    product.title = request.body.title;
    product.imageUrl = request.body.imageUrl;
    product.description = request.body.description;
    product.price = request.body.price;
  
    await product.save();
    response.redirect(`/admin/products`);
}

exports.postDeleteProduct = async(request, response) => {
    const productId = request.body.id;
    await Product.findByIdAndRemove(productId);
    response.redirect(`/admin/products`);
}

exports.getProducts = async(request, response) => {
    const products = await Product.find();
    response.render('admin/products', { 
        products, 
        title: 'Admin Products', 
        path:'/admin/products', 
        hasProducts: products && products.length > 0,
        productCSS: true,
        activeShop: true
    });
}