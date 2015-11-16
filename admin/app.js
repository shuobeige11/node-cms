var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var router = require('./router/index');
// 	api=require('./router/api');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());



app.use('/',router);
//app.use('/api',api);


http.createServer(app).listen(3000);