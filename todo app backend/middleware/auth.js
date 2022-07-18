const jwt=require("jsonwebtoken");
const User=require("../models/users")
const auth=async (req,res,next)=>{
   try{
  
    const token=req.header("Authorization").replace("Bearer ","")
  
    const decoded=jwt.verify(token,"thisismycourse")
    // we uses tokens.token BECAUSE OF THIS SPECIL CHARACTER . WE PUT IT IN STRING
    const user=await User.findOne({_id:decoded._id,"tokens.token":token})

    if(!user){
         throw new Error()
    }
    req.user=user
    req.token=token
   //  console.log("req user",req.user)
    next()
   }catch(err){
  res.status(401).send("user is not authenticated")
   }
}

module.exports=auth