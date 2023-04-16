const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {authenticate}=require("./middleware/authenticate.middleware")
require("dotenv").config()
const {blacklist}=require("./blacklist")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")


const app=express()

app.use(express.json())
app.use(cookieParser())






app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userRouter)

app.get("/getnewtoken",(req,res)=>{
    const refreshtoken=req.headers.authorization
    const decoded=jwt.verify(refreshtoken,"malhar")
    if(decoded){
     let token=jwt.sign({userID:decoded.userID},"masai",{expiresIn:60})
     return res.send(token)
    }else{
       res.send({"msg":"Invalid refresh token,Please login again"})
    }
 })

app.use(authenticate)
app.use("/post",postRouter)

app.get("/logout",(req,res)=>{
    const token=req.headers.authorization
    blacklist.push(token)
    res.send({"msg":"logout successfull"})
})



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to Mongo")
    }catch(err){
        console.log("Not able to connect to Mongo")
        console.log(err)
    }
    
    console.log("server is running.")
})