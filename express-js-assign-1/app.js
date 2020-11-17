const express = require('express');
const app = express();

// Second point of the exercise.
// app.use('/', (request, response, next) => {
//     console.log("This is the first middleware!");
//     next();
// });

// app.use('/', (request, response, next) => {
//     console.log("This is the second middleware!");
//     response.send(`<h1>Hello World! From express.js.`);
// });

// Third point of the exercise.

app.use('/user', (request, response) => {
    response.send(`<h1>Hello! From users route.</h1>`);
});

app.use('/', (request, response) => {
    response.send(`<h1>Hello! From exercise 3.</h1>`);
});

app.listen(3000);