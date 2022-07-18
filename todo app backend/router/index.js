const express=require("express");

const router=new express.Router();


router.get("/api",function(req,res){
    res.send("hellow testing")
})

module.exports=router
