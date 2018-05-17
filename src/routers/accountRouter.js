const express = require('express')
const path=require('path')
const router=express.Router();
const getloginpath=require(path.join(__dirname,'../controllers/accountController'));
//获取登录页面
router.get('/login',getloginpath.getlogin)
//获取验证码
router.get('/vcode',getloginpath.getimgs)
//获取注册页面
router.get('/register',getloginpath.getregister)
//注册处理
router.post('/register',getloginpath.getuserregister)
//
router.post('/login',getloginpath.getlogins)


module.exports=router