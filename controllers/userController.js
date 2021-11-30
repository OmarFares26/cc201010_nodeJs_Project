//Import user model
const userModel = require("../models/userModel");
//Create a UUID (ES6 module syntax)
//Syntax to import the package in local file
const {v4: uuidv4} = require('uuid');
uuidv4();

//display all users  in the users.ejs view
function getUsers(req, res, next) {
    userModel.getUsers((err, users) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            //jump to errorhandler function
            next(err)
        }
        res.render('users', {users});
    });
}

//display specified user in the user.ejs view
function getUser(req, res, next) {
    userModel.getUser((err, user) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            next(err)
        }
        res.render('user', {user});
    }, req.params.id);
}

//render register view
function getResister(req, res) {
    res.render('register')
}

//pass the new user details to model "store it in database"
function registerUser(req, res, next) {
    let picId = storeImage(req)
    userModel.registerUser((err, user) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            next(err)
        }
        if (user) {
            res.redirect('/login')
        }
    }, req.body, picId);
}

//display user details and allow user to change it
function editUser(req, res, next) {
    userModel.getUser((err, user) => {
        if (err) {
            res.status(404)
            next(err)
        }
        res.render('editUser', {user})
    }, req.params.id)
}

function updateUser(req, res, next) {
    let picId = storeImage(req)
    userModel.updateUser((err, user) => {
        if (err) {
            res.status(404)
            next(err)
        }
        res.redirect('/users/' + req.params.id)
        //res.('user', {user})
    }, req.body, picId)
}


function deleteUser(req, res, next) {
    userModel.deleteUser((err, user) => {
        if (err) {
            res.status(404)
            next(err)
        }
        res.redirect('/users');
    }, req.params.id)
}

//Function responsible for uploading image to the database
function storeImage(req) {
    if (req.files != null) {
        //generated picture name "PicId"
        let picId = uuidv4()
        let picture = req.files.image;
        //store images in this folder "images"
        let filename = './Public/images/' + picId + '.jpg';
        //mv: move
        picture.mv(filename)
        return picId;
    }
    if (req.body.image1 == '') {
        return '';
    }
    return req.body.image1;
        }



    module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
    getResister,
    registerUser,
    deleteUser,

}

