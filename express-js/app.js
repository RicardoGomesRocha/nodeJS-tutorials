const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const errorController = require('./controllers/error');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { ObjectId } = require('bson');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/src')));

app.use(async (request, response, next) =>{
    let user = await User.findById("607f5a3ae01c3e16ec20ad79");
    if(!user) {
        user = new User('admin', 'admin');
        await user.save();
    } else {
        user = new User(user.username, user.email, user._id, user.cart);
    }
    request.user = user;
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect().then(() => {
    app.listen(3000);
    console.log('Listening in http://localhost:3000.')
}).catch((error)=>console.error(error));
