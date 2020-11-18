const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/src')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);