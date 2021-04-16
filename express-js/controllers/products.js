const products = [];

exports.getAddProduct = (request, response) => {
    response.render('add-product', {
        title:'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true 
    });
};

exports.addProduct = (request, response) => {
    products.push({title: request.body.title, });
    response.redirect('/')
};

exports.getProducts = (request, response) => {
    response.render('shop', { 
        products, 
        title: 'Shop', 
        path:'/', 
        hasProducts: products && products.length > 0,
        productCSS: true,
        activeShop: true
    });
}