const database = require('../config/database'),
    ccap = require('ccap'),
    NodeSession = require('node-session'),
    session = new NodeSession({
        secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
        lifetime: 1800000, // 30 minutes 
        expireOnClose: false,
        cookie: 'skey',
        path: '/'
    });



//登录判断
exports.login = function(req, res, a, b, c) {
    let doc = {};
    let modal = database.login;
    return new Promise((resolve, reject) => {
        modal.find().exec(function(err, d) {
            if (err) {
                reject(err);
                return
            }
            doc = d;
            resolve(doc);
        });
    }).then(() => {
        let erron = 0,
            message = '您登录成功！';
           
        if (a != doc[0].userName) {
            erron = 3536;
            message = '您的用户名输入有误！';
            res.json({ erron: erron, message: message });
            return;
        }
        if (b != doc[0].passWord) {
            erron = 3537;
            message = '您的密码输入有误！';
            res.json({ erron: erron, message: message });
            return;
        }
        if (c != doc[0].identify) {
            erron = 3538;
            message = '您的验证码输入有误！';
            res.json({ erron: erron, message: message });
            return
        }
        // start session for an http request - response 
        // this will define a session property to the request object 
        session.startSession(req, res, function() {
            res.cookie('username', a);
            res.json({ erron: erron, message: message });
        });
    });
}

//修改密码
exports.updatepwd = function(req, res, a, b, c) {
    let doc = {};
    let modal = database.login;
    return new Promise((resolve, reject) => {
        modal.findOne().exec(function(err, d) {
            doc = d;
            resolve(doc)
        });
    }).then(() => {
        if (a != doc[0].passWord) {
            res.json({ erron: 4412, message: '您输入的旧密码不正确' })
            return
        }
        if (c != doc[0].identify) {
            res.json({ erron: 4413, message: '您输入的验证码不正确' })
            return
        }
        doc[0].password = b;
        modal.findOneAndUpdate(true, { passWord: doc[0].password }, function() {
            res.json({ erron: 0, message: '您的密码修改成功' })
        });
    });
}

//判断是否登录
exports.ensurelogin = function(req, res, a) {
    let doc = {};
    let modal = database.login;
    return new Promise((resolve, reject) => {
        modal.find().exec(function(err, d) {
            doc = d;
            resolve(doc)
        });
    }).then(() => {
        var b = req.cookies.skey;
        if (a == doc[0].userName && b) {
            res.json({ erron: 0, message: '您已经登录' })
        } else {
            res.json({ erron: 3345, message: '您的登录已失效' })
        }
    });

}

//验证码
exports.insure = function(req, res) {
    let captcha = ccap();
    let ary = captcha.get();
    let txt = ary[0];
    let buf = ary[1];
    let modal = database.login;
    new Promise((resolve, reject) => {
        resolve(txt);
    }).then(()=> {
        modal.findOneAndUpdate(true, { identify: txt }, ()=> {});
    })
    return buf
}