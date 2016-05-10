const database = require('../config/database');

module.exports = {
    show: function(req, res) {
        let doc = {},
            arr = [],
            modal = database.menu
        return new Promise((resolve, reject) => {
            modal.find().exec((err, d) => {
                if (err) {
                    reject(err);
                    return
                }
                doc = d;
                resolve(doc);
            });
        }).then(() => {
            doc.forEach((data) => {
                arr.push(data);
            });
            res.json({ obj: arr });
        });
    },
    importmenu: function(req, res, a, b) {
        let modal = database.menu;
        if (a == 1) {
            modal.create({ name: b }, (err) => {
                if (err) {
                    console.log(err);
                    return
                };
                res.json({ erron: 0, message: '目录创建成功' });
            });
        } else {
            return new Promise((resolve, reject) => {
                modal.findOne({ _id: a }).exec((err, d) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(d);
                });
            }).then((data, err) => {
                data.submenu.push({ name: b,sid: a });
                data.save((err) => {
                    if (err) {
                        console.log(err);
                        return
                    };
                    res.json({ erron: 0, message: '目录创建成功' });
                });
            });
        }
    }
}