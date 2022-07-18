const express=require("express");
const app=express();
const port=process.env.PORT || 4000;



const todoRouting=require("./router/todo-routing")
const userRouting=require("./router/user-routing")
require("./connection")


  
app.use(express.json())
app.use(todoRouting)
app.use(userRouting)

app.listen(port, function(){
    console.log(`app is running on ${port}`)
})