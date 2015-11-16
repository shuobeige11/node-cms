var mongoose=require('mongoose');
var config=require('./config');


var adminSchema=mongoose.Schema({
	userName:String,
	passWord:String
})

var tplSchema=mongoose.Schema({
    _id: String,
    uri:String,
    name:String,
    show:Boolean,
    text:String
});

exports.login=mongoose.model('login',adminSchema);
exports.tpl=mongoose.model('tpl',tplSchema);