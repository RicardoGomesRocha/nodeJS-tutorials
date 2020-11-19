const { request } = require('express');
const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');
const { products } = require('./admin');


router.get('/', (request, response) => {
    console.log('shop.js', products);
    response.render('shop');
});

module.exports = router;
