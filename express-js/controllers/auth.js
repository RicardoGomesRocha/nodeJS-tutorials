const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email
    });
    if (!user) return res.redirect('/login');

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();
        res.redirect('/');
    } else {
        return res.redirect('/login')
    }
};

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    let user = await User.findOne({
        email
    });
    if (user) return res.redirect('/signup');
    user = new User({
        name: email,
        email,
        password: await bcrypt.hash(password, 12)
    });
    await user.save();
    res.redirect('/login');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};