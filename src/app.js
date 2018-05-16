var express = require('express');
const path=require('path')
var app = express();

app.use(express.static(path.join(__dirname,'statics')))
const routerloginpath=require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',routerloginpath)
app.listen(3030)