const express = require('express'),
    router = express.Router(),
    opt = require('../controller/admin'),
    cookie = require('cookie'),
    md5 = require('md5'),
    database = require('../config/database');



router.get('/', function(req, res, next) {
    setTimeout(function() {
        let modal = database.login;
        return new Promise((resolve, reject) => {
            modal.findOneAndUpdate(true, { identify: '' }, () => {});
        })
    }, 60000);
    res.render('admin', { title: '我的操作台' });

});

router.get('/index', function(req, res, next) {
    res.render('index', { title: '我的操作台' });
});

router.get('/login', function(req, res, next) {
    setTimeout(function() {
        let modal = database.login;
        return new Promise((resolve, reject) => {
            modal.findOneAndUpdate(true, { identify: '' }, () => {});
        })
    }, 60000);
    res.render('admin', { title: '我的操作台' });
});


router.get('/update', function(req, res, next) {
    res.render('update', { title: 'update' })
});


router.get('/welcome', function(req, res, next) {
    res.render('welcome');
});

router.get('/menuctrl', function(req, res, next) {
    res.render('menuctrl')
})



module.exports = router;