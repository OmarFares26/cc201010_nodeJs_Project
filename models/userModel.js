//Lecture 5
 const db = require('../services/database.js').config;



// const users = [
//     {
//         id: 1,
//         name: "Tony",
//         surname: "Stark",
//         hero: "Iron Man"
//     },
//     {
//         id: 2,
//         name: "Wanda",
//         surname: "Maximoff",
//         hero: "Scarlet Witch"
//     },
//     {
//         id: 3,
//         name: "Peter",
//         surname: "Parker",
//         hero: "Spider-Man"
//     }
// ];


//lecture 4
// function getUsers() {
//     return users;
// }

function getUsers(cb) {
    db.query("SELECT * FROM users1", function (err, users, fields) {
        if (err) { cb(err) } //this is just for error handling
        console.log(users);
        cb(null, users)
    });
}


function getUser(Id, cb) {
    db.query("SELECT * FROM users1 WHERE Id="+ Id, function (err, user, fields) {
        if(typeof  user!== "undefined"){
            console.log(user)
            cb(null, user[0])
        }else {
            cb(err, null)
        }
    });

}


module.exports = {
    getUsers,
    getUser
}

