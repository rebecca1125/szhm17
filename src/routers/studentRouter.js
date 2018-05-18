const express = require('express')
const path=require('path')
const router=express.Router();
const students=require(path.join(__dirname,'../controllers/studentcontroller'))
// console.log(students)
router.get('/studentlist',students.getstudentlist)
//新增学生信息
router.get('/add',students.getstudentadd)

router.post('/add',students.getinsert)

module.exports=router