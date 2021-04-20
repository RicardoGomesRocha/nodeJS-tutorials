const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { request } = require('http');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/src')));

app.use(async (request, response, next) =>{
    const user = await User.findByPk(1);
    request.user = user;
    next();

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
sequelize.sync().then(async result => {
    const user = await User.findByPk(1);
    if (!user) {
        User.create({
            name: 'Ricardo',
            email: 'test@test.com'
        });
    }
    app.listen(3000);
}).catch((error) => console.error(error));

