const { request } = require('express');
const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');
const { products } = require('./admin');


router.get('/', (request, response) => {
    response.render('shop', { products, title: 'Shop', path:'/' });
});

module.exports = router;
