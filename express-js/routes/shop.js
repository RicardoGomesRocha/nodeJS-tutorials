const { request } = require('express');
const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');
const { products } = require('./admin');


router.get('/', (request, response) => {
    console.log('shop.js', products);
    response.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
