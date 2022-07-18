const mongoose=require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/todo`,{
    useNewUrlParser:true,
    // useCreateIndex:true
},(err,res)=>{
    // console.log("result ,",resy)
    console.log("connection successfully")
   if(err){
    throw new Error("connection issue")
   }
}
    )


  