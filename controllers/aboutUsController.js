const aboutUsModel = require("../models/aboutUsModel");


//display all members details in aboutUs.ejs view
function getInfo(req, res, next) {
    aboutUsModel.getInfo((err, info) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            //jump to errorhandler function
            next(err)
        }
        res.render('aboutUs', {info});
    });
}

//export function
module.exports = {
    getInfo
}