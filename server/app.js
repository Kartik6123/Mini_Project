const express=require('express');
const app=express();
const cors=require('cors');
const cookie=require('cookie-parser');
const model=require("./models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// app.use(cors())
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/submit",(req,res)=>{
     const {username,password,email}=req.body;
     bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(password,salt,async (err,hash)=>{
            let ans=await model.create({
                username:username,
                email:email,
                password:hash, 
            })
            res.send(ans)
    })
    })
    let token=jwt.sign({email:email},"shhhhhhh")
    res.cookie("token",token)
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    let user= await model.findOne({email:req.body.email})
    if(!user)return res.send("Something Went Wrong")
      bcrypt.compare(req.body.password,user.password,(err,ans)=>{
  if(ans){
      let token=jwt.sign({email:user.email},"shhhhhhh")
      res.cookie("token",token)
      res.send("Logged In")
  }
  else{
      res.send("Invalid Password")
  }})
  })
app.listen(3000)