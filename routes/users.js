const express = require('express');
const router = express.Router();
//import userController
const userController = require('../controllers/userController');
//import authentication
const authenticationService = require('../services/authentication');

router.get('/user/chat',userController.viewChatting)
router.post('/s/userr',userController.registerUser)

//Responsible for login authentication
router.use(authenticationService.authenticateJWT);

router.get('/', userController.getUsers)//localhost:3000/users
router.get('/:id', userController.getUser)
router.post('/:id/delete',userController.deleteUser)
router.get('/:id/edit', userController.editUser)
router.post('/:id', userController.updateUser)



//Export router
module.exports = router;
