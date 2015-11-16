var database=require('../config/database');
var promise=require('bluebird');

exports.login = function(req,res,a,b){
	var doc={};
	return new promise(function (resolve, reject){
		var modal=database.login;
		modal.find().exec(function(err,d){
			doc=d;resolve(doc)
		})
	}).then(function(){
		if(a!=doc[0].userName || b!=doc[0].passWord){
			res.redirect('/')
		}else{
			var times=new Date();
			times.setTime(times.getTime()+24*60*60*1000*1);
			res.setHeader('set-cookie',['username='+a+';expires='+times.toGMTString(),'password='+b+';expires='+times.toGMTString()]);
			res.render('index',{title:'index',body:'已经登录'})
		}
	});
}


exports.updatepwd=function(req,res,a,b){
	var doc={};
	var modal=database.login;
	return new promise(function (resolve, reject){
		modal.find().exec(function(err,d){
			doc=d;resolve(doc)
		})
	}).then(function(){
		if(a!=doc[0].passWord){
			res.redirect('/')
		}else{
			doc[0].password=b;
			modal.findOneAndUpdate(true,{passWord:doc[0].password},function(){
				res.render('index',{title:'index',body:'密码修改成功'})
			})
		}
	});
}
