const userModel = require("../models/userModel");

//comment when moving to lecture 5 stuff
//menu controller takes the request, response and next object
// function getUsers(req, res, next) {
//     const users = userModel.getUsers();
//     // res.json(users);
//     res.render('users', {users});
// }

//lecture 5
function getUsers(req, res, next) {
    userModel.getUsers((err, users) => {
        if (err) {
            res.sendStatus(500) //this is just for error handling
        }
        res.render('users', {users});
    });
}

function getUser(req, res, next) {
    userModel.getUser((err, user) => {
        if (err) {
            res.sendStatus(500) //this is just for error handling
        }
        res.render('user', {user});
    },req.params.id);
}

function editUser(req, res, next) {
    userModel.getUser((err, user)=>{
        if(err) {
            res.sendStatus(500)
        }
        res.render('editUser', {user})
    }, req.params.id)
}
function updateUser(req, res, next) {
    userModel.updateUser((err, user)=>{
        if(err) {
            res.sendStatus(500)
        }
        res.render('user', {user})
    }, req.body)
}




module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser
}

