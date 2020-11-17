const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (request, response) => {
    response.send(`<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Submit</button></form>`);
});

// /admin/add-product => POST
router.post('/add-product', (request, response) => {
    console.log(request.body);
    response.redirect('/')
});

module.exports = router;