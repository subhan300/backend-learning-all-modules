const express=require("express");

const router=new express.Router();
const userModel=require("../models/users")
const auth=require("../middleware/auth")

// my code of signup
router.post("/createUser",async(req,res)=>{
   const user=new userModel(req.body)
try{
    
      
    const saveUser=await user.save()
    const token=await saveUser.generateAuthToken()
    // console.log("saveUser",saveUser)
    res.send({saveUser,token})
}catch(err){
    res.send(err)
    console.log("error : ",err)}
})
router.post("/logout",auth,async(req,res)=>{
   
 try{
     
       
     let tokenList=req.user.tokens
     console.log("tokenList",tokenList)
     tokenList.filter(token=>token !=req.token)
     await req.user.save()
     res.status(200).send("user logout successfully")
 }catch(err){
     res.status(400).send(err)
     console.log("error : ",err)}
 })
 
// udemy instructor code 

// router.post('/createUser', async (req, res) => {
//     const user = new userModel(req.body)

//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({ user, token })
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



router.get("/getUser/:id",auth,async(req,res)=>{
const sort={}
 try{
     if(req.query.sortBy){
        const parts=req.query.sortBy.split(":")
        sort[parts[0]]=parts[1]==="desc"?-1:1
     }
     let id =req.params.id
   const user= await userModel.findById(id);

     await user.populate({path:'user_tasks',options:{
        limit:parseInt(req.query.limit),
        sort:{createdAt:1}  
    }}
    )
     console.log(user.user_tasks)
    //  res.send(user)
     res.send(user.user_tasks)
     
 }catch(err){console.log("error : ",err)
 res.send(err)
}

 })


 
router.get("/getAllUsers",auth,async(req,res)=>{

 try{
     const users=await userModel.find({})
     
    const user=await  Promise.all(users.map(async(user)=>{
        console.log("user t-31??",user)
        const getUser= await user.populate("user_tasks")
        console.log("taks>>>>>>>>>>>>>>>>>>",getUser.user_tasks)
       return getUser.user_tasks
    }))

    
     let user_task_array=[]
     user_task_array.push(users)
     user_task_array.push(user[1])
     res.status(200).send(user_task_array)
    
 }catch(err){console.log("error : ",err)
  res.send(err)
}
 })
 
 router.post("/login",async(req,res)=>{
   
 try{
   
     const users=await  userModel.findByCredentials(req.body.email, req.body.password)
     const token=await users.generateAuthToken()
      
     console.log("user",users,"toke",token)
    //  res.status(200).send({users:users.getPublicProfile(),token})
        res.status(200).send({users,token})
    //  const users2=await userModel.find({name:req.body.name})
    
    //  console.log("All Users",users2)
 }catch(err){console.log("error : ",err)
   res.send(err)
}
 })
 const multer  = require('multer')
 const upload = multer({ dest: 'uploads/' ,limits:100000,
 fileFilter(req,file,cb){
      if(!file.originalname.endsWith(".png")){
        return cb(new Error('File not uploaded'))
      }
      return cb(undefined,true)
 }
  })


router.post("/upload",upload.single("upload"),(req,res)=>{
    try{ 
   
    res.send()
}
    catch(err){
       console.log("err>>",err)}
})




module.exports=router
