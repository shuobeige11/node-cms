let mongoose = require('mongoose');
let config = require('./config');

//后台登录schema
let adminSchema = mongoose.Schema({
    userName: String,
    passWord: String,
    identify: String
});

//栏目管理schema
let menuSchema = mongoose.Schema({
    name: String,
    uid:String,
    submenu:[{
        name:String,
        uid:String,
        sid:String
    }]
});


//文章管理schema
let articleSchema = mongoose.Schema({
    artId: { type: Number, unique: true },
    uid:String,
    sid: String,
    article: String,
    creatDate: Date
});


//模版管理schema
let tplSchema = mongoose.Schema({
    _id: String,
    uri: String,
    name: String,
    show: Boolean,
    text: String
});



module.exports = {
    login: mongoose.model('login', adminSchema),
    tpl: mongoose.model('tpl', tplSchema),
    menu: mongoose.model('menu', menuSchema,'menu'),
    article: mongoose.model('article', articleSchema)
}