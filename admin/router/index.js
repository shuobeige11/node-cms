var express=require('express');
var router=express.Router();
var opt=require('../controller/admin');
var cookie=require('cookie');
var md5=require('md5');


router.get('/',function(req, res, next){
	var mycookie=req.cookies;
	if(mycookie.username==null || mycookie.password==null){
		res.render('admin',{title:'login'})
	}else{
		res.redirect('/index')
	}
});

router.get('/index',function(req,res){
	res.render('index',{title:'index',body:'已经登录'})
});

router.post('/login',function(req, res){
	var user=req.body.username,pwd=md5(req.body.password);
	var mycookie=req.cookies;
	if(user!=mycookie.username || pwd!=mycookie.password){
		opt.login(req,res,user,pwd)
	}
});

router.post('/update',function(req, res){
	var old=md5(req.body.oldpwd),news=md5(req.body.newpwd);
	opt.updatepwd(req,res,old,news);
});

module.exports = router;