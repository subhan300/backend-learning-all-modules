const express=require("express");

const router=new express.Router();
const todoModel=require("../models/AddNote")
const auth=require("../middleware/auth")


router.post("/addNote",auth,async function(req,res){
    console.log(req?.user,"req",req.body)
    const todoItem= new todoModel.todoModel({...req.body,owner:req?.user?.id})
   
try{
  let todoItemSave=await todoItem.save()
  console.log("todo item",todoItemSave,",object todo",todoItem)
  res.send(todoItem)
}catch(e){
    console.log("error in catch : ", e)
    res.send("eror is here").status(400)
}
     
})



router.put("/updateNote",async function(req,res){
    
    
   
try{
  let todoItemdoc= await todoModel.todoModel.findOneAndUpdate({title:req.body.title}, {description:req.body.description}, { new: true  });
 console.log("todo",todoItemdoc)
if(todoItemdoc==null){
    return res.send("no record found")
}
return   res.send(todoItemdoc)
}catch(e){
    console.log("error in catch : ", e)
    res.send("eror is here",e).status(400)
}
     
})

router.get("/getAllTodos",async function(req,res){
    const allTodos=await todoModel.todoModel.find({})
    res.send(allTodos)
    console.log("all tosos list ",allTodos)
})


router.get("/getTodoItem/:a",auth,async function(req,res){
    try{
   
     const todoItem = await todoModel.todoModel.findOne({title:req.body.title})
     await todoItem.populate('owner')
     console.log("todo item>>>>>>>>>>>>>",todoItem,"todo owner >>>>>>>>>>>>>>>>",todoItem.owner)
     res.send(todoItem)
    
    }catch(e){ res.send(e) }
 })
 
 router.delete("/deleteTodoItem",async function(req,res){
    try{
     const todoItem=await todoModel.todoModel.deleteOne({title:req.body.title})
      if(todoItem.deleteCount ==0){
        return res.send("item not exist")
      }
      return  res.send("item deleted suuccessfully")
     console.log("item deleted",todoItem,"params",req.params)
    }catch(e){ res.send(e) }
 })
 
//  const main=async ()=>{
        console.log("main>")
        // const todoItem=await todoModel.todoModel.find({title:"hello"})
        // await todoItem.populate('owner')
        // console.log(todoItem.owner)
//     const task = await todoModel.todoModel.findOne({title:'hello'})
//     await task.populate('owner')
//     console.log(task,task.owner)

//         // console.log("todo item",todoItem)

//  }
//  main()

module.exports=router
