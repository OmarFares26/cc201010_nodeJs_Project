const jwt = require('jsonwebtoken');
//require token
const ACCESS_TOKEN_SECRET = require('../secrets').access_token_secret;
const bcrypt = require("bcrypt");


async function checkPassword(password,hash){
    //Compares the password with the hash stored in
    let pw = await bcrypt.compare(password,hash)
    return pw;//this return a boolean
}



function authenticateUser({username, password}, users, res){
    //Find the user we are looking for
    const user = users.find(u => {
        return u.Character_Firstname === username
        //return u.Character_Firstname === username && u.password === password
    });
    if (user && checkPassword(password,user.password)) {
// Generate an access token
        const accessToken = jwt.sign({ id: user.id, name: user.Character_Firstname }, ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id)
    } else {
        res.send('Username or password incorrect');
    }
}


// function authenticateUser({username, password}, users, res) {
//     // "u":for user
//     //Find the user we are looking for
//     const user = users.find(u => { //user we get from database
//         return u.Character_Firstname === username && u.password === password ;
//     });
//
//     if (user) {
// // Generate an access token
// //passing payload
//         const accessToken = jwt.sign({id: user.id, Character_Firstname: user.Character_Firstname , admin:  user.admin}, ACCESS_TOKEN_SECRET);
//         res.cookie('accessToken', accessToken);
//         //res.redirect('/users')
//         res.redirect('/users/' + user.id)
//     } else {
//         //message sent if user not found
//         res.send('Username or password incorrect');
//     }
//
// }


function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            //console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }

}





module.exports = {
    authenticateUser,
    authenticateJWT,
};