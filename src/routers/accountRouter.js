const express = require('express')
const path=require('path')
const router=express.Router();
const getloginpath=require(path.join(__dirname,'../controllers/accountController'));

router.get('/login',getloginpath.getlogin)
router.get('/vcode',getloginpath.getimgs)

module.exports=router