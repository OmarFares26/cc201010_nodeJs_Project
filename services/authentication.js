//require Jsonwebtoken
const jwt = require('jsonwebtoken');
//require token
const ACCESS_TOKEN_SECRET = require('../secrets').access_token_secret;
const bcrypt = require("bcrypt");

async function authenticateUser({username, password}, users, res) {
    //Find the user we are looking for
    const user = users.find(u => {
        return u.Character_Firstname === username
        //return u.Character_Firstname === username && u.password === password
    });
    //user.password represent hash stored in db
    if (user && await bcrypt.compare(password, user.password)) {
// Generate an access token

        const accessToken = jwt.sign({ //payload
            id: user.id,
            name: user.Character_Firstname,
            role: user.role
        }, ACCESS_TOKEN_SECRET);//Signature calculation

        //Set a cookie ('Name' , 'Value of the Generated Token')
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id)
    } else {
        //redirect to the login page and flash-message error appears
        res.redirect('/login')
    }
}


function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];//save the value of the accessToken cookie into a variable

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;//set user as req.user
            next();
        });
    } else {
        res.render('unauthorized',{title:"please login first"})
    }

}




//export the functions
module.exports = {
    authenticateUser,
    authenticateJWT,
};