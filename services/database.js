//In this Js file we Connect our nodeJs with the database

//Require mysql module
const mysql = require('mysql');
//require the secrets js which we store our database password inside it
const secrets = require('../secrets');

//Database credentials
const config = mysql.createConnection({
    host: "atp.fhstp.ac.at",
    port: 8007,
    user: "cc201013",
    password: secrets.dbPassword,
    database: "cc201013"
});


config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {config}