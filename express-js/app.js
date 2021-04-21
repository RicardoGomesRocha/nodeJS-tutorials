const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const errorController = require('./controllers/error');
const mongoose = require('mongoose')
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
    let user = await User.findById("608084bba86a513ce8321395");
    if(!user) {
        user = new User({username: 'admin', email: 'admin',cart: {items:[]}});
        await user.save();
    }
    request.user = user;
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://admin:admin@cluster0.znfhk.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(() => {
    app.listen(3000);
    console.log('Listening in http://localhost:3000.')
}).catch((error)=>console.error(error));

