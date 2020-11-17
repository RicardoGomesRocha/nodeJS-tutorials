const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({express: false}));

app.use('/add-product', (request, response) => {
    response.send(`<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Submit</button></form>`);
});

app.use('/product', (request, response) => {
    console.log(request.body);
    response.redirect('/')
});

app.use('/', (request, response) => {
    response.send('<h1>Hello from Express!');
});
app.listen(3000);