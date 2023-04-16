const express=require("express");
const {PostModel}=require("../model/post.model")

const postRouter=express.Router();




postRouter.post("/create",async(req,res)=>{
  const payload=req.body  
  const post=new PostModel(payload)
  await post.save();
  res.send({"msg":"New post is created."})
})



postRouter.get("/",async(req,res)=>{
    const posts=await PostModel.find()
    res.send(posts)
})




postRouter.patch("/update/:postId",async(req,res)=>{
    const {postId}=req.params
    const payload=req.body
    await PostModel.findByIdAndUpdate({_id:postId},payload)
    res.send({"msg":"Post is updated."})

})




postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params
    
    try{
     await PostModel.findByIdAndDelete({_id:postId})
       res.status(200).send({"msg":"The post is deleted."})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    postRouter
}