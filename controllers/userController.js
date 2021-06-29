//Import user model
const userModel = require("../models/userModel");
//Create a UUID (ES6 module syntax)
//Syntax to import the package in local file
const { v4: uuidv4 } = require('uuid');uuidv4();


//lecture 5
function getUsers(req, res, next) {
    userModel.getUsers((err, users) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            //jump to errorhandler function
            next(err)
        }
        //console.log(users)
        res.send("")
        res.render('users', {users});
    });
}
function getUser(req, res, next) {
    userModel.getUser((err, user) => {
        if (err) {
            //this is just for error handling
            res.status(404)
            next(err)
        }
        //console.log(user.Character_Image)
        res.render('user', {user});
    }, req.params.id);
}

function viewChatting(req,res){
        res.render('chat');
}

function getResister(req, res) {
    res.render('register')
}

function registerUser(req, res, next) {
    let picId = storeImage(req)
    userModel.registerUser((err, user) => {
        if (err) {
             //this is just for error handling
            res.status(404)
            next(err)
        }
        //console.log("hey from controller");
        if (user) {
            res.redirect('/')
        }
    }, req.body , picId);
}

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
    }, req.body , picId)
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
function storeImage(req) {
    if (req.files != null) {
        let picId = uuidv4()
        let picture = req.files.image;
        //store images in this folder "images"
        let filename = './Public/images/' + picId + '.jpg';
        //mv: move
        picture.mv(filename)
        return picId;
    }
    if (req.body.Character_Image == '') {
        return '';
    }
    return req.body.Character_Image;
}




module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
    getResister,
    registerUser,
    deleteUser,
    viewChatting
}

