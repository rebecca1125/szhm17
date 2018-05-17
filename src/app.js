var express = require('express');
const path=require('path')

//post处理
var bodyParser = require('body-parser')
var app = express();
//图片验证码
var session = require('express-session')
app.use(express.static(path.join(__dirname,'statics')))
const routerloginpath=require(path.join(__dirname,'routers/accountRouter.js'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 5*60000 }}))
app.use('/account',routerloginpath)
app.listen(3030)