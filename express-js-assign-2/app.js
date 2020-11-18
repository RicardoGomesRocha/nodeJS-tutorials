const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const baseRouter = require('./routes/base');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(userRouter);
app.use(baseRouter);


app.listen(3000);