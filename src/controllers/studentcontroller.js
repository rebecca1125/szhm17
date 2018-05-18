const path=require('path')
var xtpl = require('xtpl')

const datatools=require(path.join(__dirname,'../tools/tools.js'))
const studentlistpage=path.join(__dirname,'../statics/views/studentlist.html')
const studentadd=path.join(__dirname,'../statics/views/add.html')
//获取学生列表
exports.getstudentlist=(req,res)=>{
    var keyword=req.query.keyword||"";
    datatools.finddata('studentinfo',{ name: { $regex: keyword } },(err,docs)=>{
        if(docs!=null){
            xtpl.renderFile(studentlistpage,{
                array:docs
            },function(error,content){
                res.send(content)
            });
        }
        
        
    })

    
}
//获取新增学生信息页面
exports.getstudentadd=(req,res)=>{
    xtpl.renderFile(studentadd,{
        
    },function(error,content){
        res.send(content)
    });
}

//新增一条学生信息处理
exports.getinsert=(req,res)=>{
    console.log(req.body)
    datatools.insertOne('studentinfo',req.body,(err,resultdata)=>{
        if(err){
            res.send('alert(新增失败)')
        }
        else{
            res.send("<script>window.location.href='/student/studentlist'</script>")
        }
    })

}

