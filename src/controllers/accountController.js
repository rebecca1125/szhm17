const fs = require('fs')
const path = require('path')
// var express = require('express');
// var app = express();
const captchapng = require('captchapng');

const loginpath = path.join(__dirname, '../statics/views/login.html')

exports.getlogin = (req, res) => {
    fs.readFile(loginpath, (err, data) => {
        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.send(data)
    })

}
//验证码
var vcode=null;
exports.getimgs = (req, res) => {
     vcode=parseInt(Math.random() * 9000 + 1000);
     req.session.vcode=vcode;
    var capt = new captchapng(80, 30, vcode); // 图片宽度,图片高度,随机数字  
    capt.color(255, 0, 0, 255); // First color: 图片背景色 (red, green, blue, alpha)  
    capt.color(80, 80, 80, 255); // Second color: 数字颜色 (red, green, blue, alpha)  
    //转换成base64  
    var icodeImg = capt.getBase64();
    var imgbase64 = new Buffer(icodeImg, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    // console.log(icodeImg);
    
    console.log(vcode)
    
    
}
//注册页面
const registerpath = path.join(__dirname, '../statics/views/register.html')
exports.getregister = (req, res) => {
    fs.readFile(registerpath, (err, data) => {
        res.setHeader('content-type', 'text/html;charset=utf-8')
        res.send(data)
    })

}
//注册处理

exports.getuserregister = (req, res) => {
    let result = {
        status: 0,
        message: "注册成功"
    }
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'sahmqd17';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection('usernfo');
        // Find some documents
        console.log(req.body)
        collection.findOne({
            username: req.body.username
        }, (err, doc) => {
            if (doc == null) {
                collection.insertOne(
                    req.body,
                    function (err, resultdata) {
                        console.log(resultdata)
                        client.close();
                        res.send(result)
                    });
            } else {
                result.status = 1;
                result.message = "此用户名已有人注册";
                res.send(result)
            }


        });


    });

}
//登录处理
exports.getlogins=(req,res)=>{
    let result = {
        status: 0,
        message: "登录成功"
    }
    console.log(req.body.vcode)
    console.log(req.session.vcode)

    if(req.session.vcode!=req.body.vcode){
        result.status=1;
        result.message="验证码失败"
        res.send(result)
        return;        
    }
    else{
        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://localhost:27017';

    // Database Name
        const dbName = 'sahmqd17';
        MongoClient.connect(url, function (err, client) {

            const db = client.db(dbName);
            const collection = db.collection('usernfo');
            // Find some documents
            console.log(req.body)
            collection.findOne({
                username:req.body.username,password:req.body.password
            }, (err, doc) => {
                console.log(doc)
                if (doc == null) {
                    result.status = 2;
                    result.message = "账号或用户名错误";
                    
                    // getimgs();
                } 
                res.send(result)
                client.close();
    
    
            });
    
    
        });

        
    }

}