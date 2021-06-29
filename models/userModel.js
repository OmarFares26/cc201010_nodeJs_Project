//import database
const db = require('../services/database.js').config;
const bcrypt = require('bcrypt')

function getUsers(cb) {
    db.query("SELECT * FROM users1", function (err, users, fields) {
        if (err) {
            cb(err)//this is just for error handling
        }
        else {
            cb(null, users)

        }
    });
}

function getUser(cb, id) {
    //select data from database
    let sql = "SELECT * FROM users1 WHERE id= " + parseInt(id);
    //request for data from database
    db.query(sql, function (err, user, fields) {
        if (err) {
            cb(err)
        }else{
            cb(null, user[0])

        }
        //console.log(user[0])
    });
}

async function registerUser(cb, input , picId) {
    //pw : to calculate the hash of the password
    let pw = await bcrypt.hash(input.password, 10)
    let sql = "INSERT INTO users1 (Character_Firstname, Character_Lastname, Character_Nickname, email , password , Character_Image ) VALUES ('" + input.name + "','" + input.surname + "','" + input.nickname + "','" + input.email + "','" + pw + "','" + /images/+picId+'.jpg' + "')";
   // console.log(sql)

    db.query(sql, function (err, input, fields) {
        if (err) {
            cb(err, null)
        }
        cb(null, input)
    });
}

function updateUser(cb, userData , picId) {
    //left side column name , right side input field name
    //db.escape parses whatever we give to it to prevent sql injection
    //update table users1
    let sql = "UPDATE users1 SET" +
        " Character_Firstname = " + db.escape(userData.Character_Firstname) +
        ", Character_Lastname = " + db.escape(userData.Character_Lastname) +
        ", Character_Nickname = " + db.escape(userData.Character_Nickname) +
        ", email = " + db.escape(userData.email) +
        ", Character_Image = " + db.escape(/images/+ picId +'.jpg') +
        " WHERE id = " + parseInt(userData.id);
    console.log(picId)
    console.log(sql)
    db.query(sql, function (err, result, fields) {
        if (err) {
            cb(err)
        }
        // console.log(result.affectedRows + " rows have been affected!");
        cb(null, userData);
    })
}

function deleteUser(cb, id) {
    let sql = "DELETE FROM users1 WHERE id = " + id;
    db.query(sql, function (err, result, fields) {
        if (err) {
            cb(err)
        }
        //console.log(result.affectedRows + " rows have been affected!");
        cb(null);
    })
}

//Export "userModel" so we can use them in  "userController"
module.exports = {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser
}

