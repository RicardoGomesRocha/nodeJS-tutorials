const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');


app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/src')));

app.use(async (request, response, next) =>{
    next();
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect().then(() => {
    app.listen(3000);
}).catch((error)=>console.error(error));




// sequelize.sync(
//     // {force: true}
//     ).then(async result => {
//     let user = await User.findByPk(1);
//     if (!user) {
//         user = await User.create({
//             name: 'Ricardo',
//             email: 'test@test.com'
//         });
//         await user.createCart();
//     }
//     app.listen(3000);
// }).catch((error) => console.error(error));

