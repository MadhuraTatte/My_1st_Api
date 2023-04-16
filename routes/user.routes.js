const express=require("express");
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")



userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,gender,password,age,city}=req.body;

       
        
                bcrypt.hash(password,5,async(err,hash)=>{
                    if (err){
                      res.status(400).send({"msg":err.message})
                    } else{
                         const user=new UserModel({name,email,gender,password:hash,age,city})
                         await user.save();
                          res.status(200).send({"msg":"New user is registered."})
                      }
              
                })
            
        
       
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})



userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
       const user=await UserModel.find({email})
       if(user.length>0){
        console.log(user)
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                let token=jwt.sign({userID:user[0]._id},"masai",{expiresIn:60*60})

                const refreshtoken=jwt.sign({userID:user[0]._id},"malhar",{expiresIn:60*60*24*7})

                res.cookie("blogAccessToken",token,{maxAge:1000*60*60})
                res.cookie("blogRefreshToken",refreshtoken,{maxAge:1000*60*60*24*7})


                res.status(200).send({"msg":"Logged in","token":token,"refreshtoken":refreshtoken})
            }else{
                res.send({"msg":"Wrong Credential"})
            }
        })
        

       }else{
           res.send({"msg":"Wrong Credential"})
       }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    userRouter
}