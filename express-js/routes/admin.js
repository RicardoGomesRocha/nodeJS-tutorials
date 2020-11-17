const express = require('express');

const router = express.Router();

router.get('/add-product', (request, response) => {
    response.send(`<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Submit</button></form>`);
});

router.post('/product', (request, response) => {
    console.log(request.body);
    response.redirect('/')
});

module.exports = router;