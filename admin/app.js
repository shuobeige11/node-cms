require('babel-core/register');

var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var router = require('./router/index');
var api=require('./router/api');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var helmet=require('helmet');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');
require('./helper/helper')(hbs);
hbs.registerPartials(path.join(__dirname,'view','partials'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


//安全设置，
//禁用x-powered-by 头
//禁止任何frame,iframe,xss protections
app.use(helmet());


app.use('/',router);
app.use('/api',api);

//catch 404 error handler
app.use(function(req,res,next){
	var err= new Error('Not Found');
	err.status=404;
	next(err);
});


//catch 500 error handler
app.use(function(err,req,res){
	res.status(err.status || 500);
	res.render('error',{
		message:err.message,
		error:{}
	});
});


http.createServer(app).listen(3000);