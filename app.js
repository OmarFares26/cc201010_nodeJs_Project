const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const ejs = require('ejs')
const db = require('./services/database.js')
const ws = require('./services/webSockets')






app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


// telling the express module that the public  directory has all of our site assets
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

app.use(cookieParser())

app.use(cors())
app.use(fileUpload({createParentPath: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))







//app.get('/', (req, res) => {
  //  res.send('Hello World!');
//});


const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/', (req, res) => {
 res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at
http://localhost:${port}`);
})