var express = require('express'),
    router = express.Router(),
    opt = require('../controller/admin'),
    menuctrl=require('../controller/menuctrl'),
    md5 = require('md5'),
    querystring = require('querystring'),
    ccop = opt.insure;

router.get('/insure', function(req, res, next) {
    var buf = ccop();
    res.end(buf);
});


router.post('/login', function(req, res, next) {
    var user = req.body.username,
        pwd = md5(req.body.password),
        identify = req.body.identify;
    opt.login(req, res, user, pwd, identify.toUpperCase());
});


router.post('/ensurelogin', function(req, res, next) {
    var user = req.body.username
    opt.ensurelogin(req, res, user);
});


router.post('/update',function(req, res,next){
	var old=md5(req.body.oldpwd),news=md5(req.body.newpwd),identify=req.body.identify;
	opt.updatepwd(req,res,old,news,identify.toUpperCase());
});

router.get('/menuctrlapi',function(req,res,next){
    menuctrl.show(req,res); 
});

router.post('/menuInsert',function(req,res,next){
    var uid=req.body.uid,name=req.body.name;
    menuctrl.importmenu(req,res,uid,name); 
});

module.exports = router;