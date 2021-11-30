const express = require('express');
const router = express.Router();
//import authentication
const authenticationService = require('../services/authentication');
//import Controllers (userController,aboutUsController)
const aboutUsController = require('../controllers/aboutUsController');
const userController = require('../controllers/userController');
//import UserModel
const userModel = require('../models/userModel');

//require Jsonwebtoken
const jwt = require('jsonwebtoken');
//require token
const ACCESS_TOKEN_SECRET = require('../secrets').access_token_secret;



//Get request
//1st param "path" ,  2nd param "handler function"
router.get('/', (req, res) => {
    res.render('index', {title: 'Express'})
});

router.get('/aboutUs', aboutUsController.getInfo);

router.get('/empty', (req, res) => {
    res.render('empty')
})

router.get('/unauthorized', (req, res) => {
    res.render('unauthorized')
})


router.route('/login')
    .get((req, res, next) => {
        res.render('login',)
    })
    .post((req, res) => {
        //if the username or password are incorrect flash-message "error" appears
        req.flash('error', "Username or password incorrect")
        //const messages = req.flash();
        userModel.getUsers((err, users) => {
            if (err) {
                res.sendStatus(500)
            }
            //call a function of authentication service
            //req.body: (username & password from login ejs)
            //users: users from our users1 table
            authenticationService.authenticateUser(req.body, users, res)
        })
    })


router.get('/logout', (req, res) => {
    //kill cookies
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/login')
})

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

router.get('/chat', (req, res , next) => {
    const token = req.cookies['accessToken'];//save the value of the accessToken cookie into a variable
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.name;//set user as req.user
            console.log(user)
            next();
        });
    } else {
        req.user = "Guest"
        console.log(req.user)
    }
        res.render('chat' ,{user:req.user} )

});

router.get('/register', userController.getResister);


//send cookie to client machine
router.get('/cookies', (req, res) => {
// Read cookies
    let counter = req.cookies['visitCounter'];
    console.log("Current counter value: " + counter);
    if (isNaN(counter)) { //error check
        counter = 0;
    }
    counter++;
    console.log("New counter value: " + counter);
// Set cookie
    //Max age: cookie expiration
    res.cookie('visitCounter', counter, {maxAge: 2 * 60 * 60 * 1000});
    res.send('Cookie was set to ' + counter);
});


//Export Router
module.exports = router;