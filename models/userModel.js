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


function getUser(cb,id) {
    let sql = "SELECT * FROM users1 WHERE id= " + parseInt(id);
    db.query( sql, function (err, user, fields) {
        if(err){

            cb(err)
        }
        console.log(user[0])
        cb(null,user[0])
    });

}

/*function postUser(cb , info) {
    let sql = "insert into users1(name,surname,email,hero,info) values('"+ info.name +"','"+ info.surname +"','"+ info.email +"','"+ info.hero+"','"+ info.info +")";
    db.query( sql, function (err, user, fields) {
        if(err){

            cb(err)
        }
    });

}*/

function updateUser(cb, userData) {
    //update table users1
    let sql = "UPDATE users1 SET" +
        " name = "+ db.escape(userData.name) +
        ", surname = "+ db.escape(userData.surname) +
        ", hero = "+ db.escape(userData.hero) +
        ", email = "+ db.escape(userData.email) +
        ", info = "+ db.escape(userData.info) +
        " WHERE id = " + parseInt(userData.id);
    console.log(sql)
    db.query(sql, function (err, result, fields) {
        if (err) {
            cb(err)
        }
        console.log(result.affectedRows + " rows have been affected!");
        cb(null, userData);
    })
}




module.exports = {
    getUsers,
    getUser,
    updateUser

}

