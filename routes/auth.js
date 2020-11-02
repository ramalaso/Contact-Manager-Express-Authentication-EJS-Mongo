var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

router.route('/register')
    .get((req, res, next) => {
        res.render('register', {});
    })
    .post((req, res, next) => {
        Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
            if (err) {
                return res.render('register', { account });
            }
            req.login(account, function (err) {
                res.redirect('/contacts');
            });
        });
    });

router.get('/login', (req, res, next) => {
    res.render('login', { user: req.user });
});

router.all('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;