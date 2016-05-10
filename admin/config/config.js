var mongoose=require('mongoose');
var link='mongodb://127.0.0.1:27017/cms';

mongoose.connect(link);
var db=mongoose.connection;

db.on('error', function (err) {logger.log('error', 'db error', err)});
db.once('open', function (callback) {
  console.log("link database success")
});
