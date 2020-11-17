const express = require('express');
const app = express();

app.use('/', (request, response, next) => {
    console.log('This always run!');
    next();
});

app.use('/add-product', (request, response, next) => {
    console.log('In the middleware');
    response.send('<h1>The "add product" page!');
});

app.use('/', (request, response, next) => {
    console.log('In the middleware');
    response.send('<h1>Hello from Express!');
});
app.listen(3000);