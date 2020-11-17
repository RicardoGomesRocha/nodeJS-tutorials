const express = require('express');
const app = express();

app.use((request, response, next) => {
    console.log('In the middleware');
    next();
});

app.use((request, response, next) => {
    console.log('Another middleware');
    response.send('<h1>Hello from express.js</h1>');
});

app.listen(3000);