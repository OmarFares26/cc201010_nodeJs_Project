//Lecture 5
//const db = require('../services/database.js').config;

//comment when using lecture 5 stuff
const users = [
    {
        id: 1,
        name: "Tony",
        surname: "Stark",
        hero: "Iron Man"
    },
    {
        id: 2,
        name: "Wanda",
        surname: "Maximoff",
        hero: "Scarlet Witch"
    },
    {
        id: 3,
        name: "Peter",
        surname: "Parker",
        hero: "Spider-Man"
    }
];

//comment when using lecture 5 stuff
function getUsers() {
    return users;
}

//Lecture 5
// function getUsers(cb) {
//     db.query("SELECT * FROM users", function (err, users, fields) {
//         if (err) { cb(err) } //this is just for error handling
//         console.log(users);
//         cb(null, users)
//     });
// }

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id))
    if (typeof user !== "undefined") {
        return user;
    } else {
        return 'Error 404: This user could not be found.'
    }

}


module.exports = {
    getUsers,
    getUser
}

