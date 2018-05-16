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
exports.getimgs = (req, res) => {
    
    var capt = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // 图片宽度,图片高度,随机数字  
    capt.color(255, 0, 0, 255); // First color: 图片背景色 (red, green, blue, alpha)  
    capt.color(80, 80, 80, 255); // Second color: 数字颜色 (red, green, blue, alpha)  
    //转换成base64  
    var icodeImg = capt.getBase64();
    var imgbase64 = new Buffer(icodeImg, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    console.log(icodeImg);
}