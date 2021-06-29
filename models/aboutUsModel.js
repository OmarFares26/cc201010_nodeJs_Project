const db = require('../services/database.js').config;


function getInfo(cb) {
    db.query("SELECT * FROM aboutUs", function (err, info, fields) {
        if (err) {
            cb(err)
        }
        console.log(info);
        cb(null, info)
    });
}


module.exports = {
    getInfo
}