const mongoose=require("mongoose")

const todoModel=mongoose.model("todo-collection",{
    title:{type:String,required:true
        },
    description:{type:String}, 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }


    }
)





module.exports ={todoModel}

