const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem})

sequelize.sync(
    {force: true}
    ).then(async result => {
    let user = await User.findByPk(1);
    if (!user) {
        user = await User.create({
            name: 'Ricardo',
            email: 'test@test.com'
        });
        await user.createCart();
    }
    app.listen(3000);
}).catch((error) => console.error(error));

