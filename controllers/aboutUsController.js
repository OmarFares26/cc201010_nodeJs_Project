const aboutUsModel = require("../models/aboutUsModel");

function getInfo(req, res, next) {
    aboutUsModel.getInfo((err, info) => {
        if (err) {
            res.sendStatus(500) //this is just for error handling
        }
        res.render('aboutUs', {info});
    });
}


module.exports = {
    getInfo
}