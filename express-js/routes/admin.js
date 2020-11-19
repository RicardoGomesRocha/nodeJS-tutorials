const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (request, response) => {
    response.render('add-product', {
        title:'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true 
    });
});

// /admin/add-product => POST
router.post('/add-product', (request, response) => {
    products.push({title: request.body.title, });
    response.redirect('/')
});

exports.routes = router;
exports.products = products;