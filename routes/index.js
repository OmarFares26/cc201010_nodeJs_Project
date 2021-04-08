const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/example/b', function (req,res,next){
    console.log('the response will be sent by next function')
    next()
}, function (req,res){
    res.send('Hello from example B!')
})

const cbC1 = function (req,res,next){
    console.log('Call back from c1')
    next()
}

const cbC2 = function (req,res,next){
    console.log('Call back from C2')
    next()
}

const cbC3 = function (req,res,next){
    console.log('Call back from C3')
    res.send('response from C3')
}


router.get('/example/c',[cbC1,cbC2,cbC3])

router.get('/example/d',[cbC1,cbC2] , function (req,res){
    console.log('this function we wrote ourselves')
    res.send('hello from example D')
})


module.exports = router;