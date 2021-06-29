const express = require('express');
const router = express.Router();
//import authentication
const authenticationService = require('../services/authentication');
//import Controllers (userController,aboutUsController)
const aboutUsController = require('../controllers/aboutUsController');
const userController = require('../controllers/userController');
//import UserModel
const userModel = require('../models/userModel');




//Get request
//1st param "path" ,  2nd param "handler function"
router.get('/', (req,res) => {
    // res.send('Hallo world!');
    res.render('index' , {title :'Express'})
});

router.get('/aboutUs',aboutUsController.getInfo);

router.route('/login')
    .get((req, res) => {
        res.render('login', )
    })
    .post((req, res) => {
        userModel.getUsers((err, users) => {
            if (err) {
                res.sendStatus(500)
            }
            authenticationService.authenticateUser(req.body, users, res )
        })
    })


router.get('/logout', (req, res) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.redirect('/login')
})

// router.get('/chat', (req, res) => {
//     res.render('chat')
// })

router.get('/register',userController.getResister);


//send cookie to client machine
router.get('/cookies', (req, res) => {
// Read cookies
    let counter = req.cookies['visitCounter'];
    console.log("Current counter value: " + counter);
    if (isNaN(counter)) { //error check
        counter = 0;
    }
    counter ++;
    console.log("New counter value: " + counter);
// Set cookie
    //Max age: cookie expiration
    res.cookie('visitCounter', counter , {maxAge: 2*60*60*1000});
    res.send('Cookie was set to ' + counter);
});



//Export Router
module.exports = router;