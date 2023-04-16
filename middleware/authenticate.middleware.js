const jwt=require("jsonwebtoken")
const { blacklist } = require("../blacklist")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(blacklist.includes(token)){
        return res.send({"msg":"Please login"})
    }
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        })
    }else{
        res.send({"msg":"Please Login"})
    }
}
module.exports={
   authenticate
}