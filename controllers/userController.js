const userModel = require("../models/userModel");

//comment when moving to lecture 5 stuff
//menu controller takes the request, response and next object
function getUsers(req, res, next) {
    const users = userModel.getUsers();
    // res.json(users);
    res.render('users', {users});
}

//lecture 5
// function getUsers(req, res, next) {
//     userModel.getUsers((err, users) => {
//         if (err) {
//             res.sendStatus(500) //this is just for error handling
//         }
//         res.render('users', {users});
//     });
// }


function getUser(req, res, next) {
    const user = userModel.getUser(parseInt(req.params.id));
    //res.json(user);
    res.render('user', {user});
}

module.exports = {
    getUsers,
    getUser
}