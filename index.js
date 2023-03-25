const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
const {authenticate}=require("./middleware/authenticate.middleware")
require("dotenv").config()
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/post",postRouter)

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