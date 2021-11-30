const express = require('express');
const router = express.Router();
//import userController
const userController = require('../controllers/userController');
//import authentication
const authenticationService = require('../services/authentication');


//add a new user
router.post('/add/user', userController.registerUser)

//Responsible for login authentication
router.use(authenticationService.authenticateJWT);

router.get('/', userController.getUsers)//localhost:3000/users

//Only users with role administrator "admin" can access all users data
//Each user can only access his own page/profile
router.get('/:id', (req, res, next) => {
    if ((req.user.role == 'admin') || req.user.id == req.params.id) {
        userController.getUser(req, res, next)
    } else {
        res.render('empty', {title: "Only admins can access this page"})
    }
});

//Only users with role administrator "admin" are allowed to delete
router.post('/:id/delete', (req, res, next) => {
    if ((req.user.role == 'admin')) {
        userController.deleteUser(req, res, next)
    } else {
        res.render('empty', {title: "Only admins can do this action"})
    }
});
//Only users with role administrator "admin" are allowed to edit and update users details/profile
router.get('/:id/edit', (req, res, next) => {
    if ((req.user.role == 'admin')) {
        userController.editUser(req, res, next)
    } else {
        res.render('empty', {title: "You are not allowed to edit"})
    }
});
//update user
router.post('/:id', userController.updateUser)


//Export router
module.exports = router;
