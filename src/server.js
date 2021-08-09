var express =require("express");
var bodyparser=require("body-parser");
var cors = require("cors");
var mongo=require("mongoose");


var db=mongo.connect("mongodb://localhost:27017/angulardb",(err,res)=>{
    if(err){
        console.log(err);

    }
    else{
    console.log("db connected to+db",'+',res);
    }
});
var app =express();
app.use(bodyparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.use("/", (req, res, next) => {
    res.setHeader('Access-control-Allow-origin', 'http://localhost:4200');
    res.setHeader('Access-control-Allow-Methods', 'Get,post,put,delete,patch');
    next();     
});
var schema=mongo.Schema;
var userschema = new schema({
    Username: {type:String,required:true,max:100},
    Address: {type:String,required:true,max:100},
    City: {type:String,required:true,max:100}
});
var usermodel= mongo.model("userdb",userschema);
app.post('/create',(req,res)=>{
        let user = new usermodel({
        Username:req.body.Username,
        Address:req.body.Address,
        City:req.body.City,


    });
    user.save((err,result)=> {
        if(err){
            return console.log(err);
        }else{
            res.json(result);
        }
    });
});
app.put('/update/:id',(req,res,next)=>{
    usermodel.findByIdAndUpdate(req.params.id,{$set:req.body},(err,data)=>{
        if(err){
            return next(err);

        }else{
            res.json(data);
        }
    });
});
app.get('/getone/:id',(req,res,next)=>{
    usermodel.findById(req.params.id,(err,data)=>{
        if(err){
            return next(err)

        }else{
            res.json(data);
        }
    });
});
app.get('/find',(req,res)=>{
    usermodel.find((err,data)=>{
        if(err){
            return next(err)
        }else{
            res.json(data);
        }
    });
});
app.delete('/delete/:id',(req,res,next)=>{
    usermodel.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            return next (err)
        }else{
            res.json(data);

        }
    });
});


app.get('/',(req,res)=>{
console.log("welcome");
});








let port=3000;
app.listen(port, ()=> {
    console.log("server running on port","+",port);
});
