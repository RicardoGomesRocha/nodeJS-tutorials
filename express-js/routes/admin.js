const express = require('express');
const path = require('path');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (request, response) => {
   response.sendFile(path.join(__dirname,'../', 'views', 'add-product.html'))
});

// /admin/add-product => POST
router.post('/add-product', (request, response) => {
    console.log(request.body);
    response.redirect('/')
});

module.exports = router;