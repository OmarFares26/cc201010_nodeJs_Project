//Require express module
const express = require('express')
//Initialise express server as app
const app = express()
//Set the port
const port = 3001;
//allow us the parse the body client sent to the server
const bodyParser = require('body-parser')

const cors = require('cors')
const fileUpload = require('express-fileupload')
//to read cookies
const cookieParser = require('cookie-parser')
//Gives Us the right path of the machine we are working on
const path = require('path')
const ejs = require('ejs')
const db = require('./services/database.js')
const ws = require('./services/webSockets')
const chalk = require("chalk")
const morgan = require('morgan')
const fs = require('fs')
//unique ids
const uuid = require('uuid')





//path of the view
app.set('views', path.join(__dirname, 'views'))
//type of view
app.set('view engine', 'ejs');


// telling the express module that the public  directory has all of our site assets
//serve static files from /public
//This makes all files in the directory public accessible to the public users
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/requests.log'), { flags: 'a' })
// write detailed logs into the specified file
    app.use(morgan('combined', { stream: accessLogStream }))
// write short logs into the console
    app.use(morgan('short'))



app.use(cookieParser())

app.use(cors())
app.use(fileUpload({createParentPath: true}))


//allow us to interpret json
//return middleware that only parse JSON
app.use(bodyParser.json())
//allow us to interpret urlencoded
//return middleware that only parse urlencoded
app.use(bodyParser.urlencoded({extended:true}))


//import the routers in the app.js
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

//use the routers for the desired routes
app.use('/', indexRouter)
app.use('/users', usersRouter)


// err tells  nodejs/Express that this is an error handler function
function  errorHandler(err,req,res,next){
    console.log(err)
    res.render('error',{error: err})
}
//Tell the app to always use this function
app.use(errorHandler)


//Tell the App to listen to requests
//1st param "Running port" ,  2nd param "callback function"
app.listen(port, () => {
    console.log(`Example app listening at
http://localhost:${port}`);
})