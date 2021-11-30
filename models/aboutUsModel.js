const db = require('../services/database.js').config;

//get all members details from database
function getInfo(cb) {
    db.query("SELECT * FROM aboutUs", function (err, info, fields) {
        if (err) {
            cb(err)
        }
        console.log(info);
        cb(null, info)
    });
}

//Export "aboutUsModel functions" so we can use them in  "aboutUsController"
module.exports = {
    getInfo
}