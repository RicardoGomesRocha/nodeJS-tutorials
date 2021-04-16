const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');

const app = express();


app.engine('hbs', expressHbs(
    {layoutDir:'views/layout', defaultLayout: 'main-layout', extname: 'hbs'}
));
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/src')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((request, response) => {
    response.render("404", { title: 'Page not found!'});
});

app.listen(3000);