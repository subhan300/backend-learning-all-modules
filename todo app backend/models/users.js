// const mongoose=require("mongoose")
// const validator=require("validator")
// const userSchema=new mongoose.Schema({name:{type:String,required:true },email:{type:String,required:true},password:{type:String,required:true}})


// userSchema.pre("save",async (next)=>{
//     const user=this
//     console.log("thi",this)
//     console.log("do something before save here ",user.password)
//     next()

// })

// const userModel=mongoose.model("users",userSchema)
// module.exports =userModel



const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens:[{
       token:{ type:String,
        required: true,}

    }]
})
// WE CAN DO LIKE THIS
// userSchema.methods.getPublicProfile=function(){
//     const user=this;
//     const userObject=user.toObject()
//     delete userObject.password;
//     delete userObject.tokens; 
//     return userObject
// }

// WE HAVE CALLED EXPLICTLY 
userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject()
    delete userObject.password;
    delete userObject.tokens; 
    return userObject
}
userSchema.methods.generateAuthToken =async function(){
    const user=this
    const token=jwt.sign({_id:user._id},"thisismycourse")
    console.log("check user objects",user,"token",token,user.tokens)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

//     user.tokens = user.tokens.concat({ token })
//     await user.save()

//     return token
// }
userSchema.statics.findByCredentials=async (email,password)=>{
  console.log("email",email)
  const user=await User.findOne({email})
  if(user){
    isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
           return user
    }else{
        throw new Error('password not match')
    }
  }else{
    throw new Error('Could not find email ')
    // res.status(404).send("not found")
  }

}

userSchema.pre('save', async function (next) {
    const user = this
    console.log("usrr",user)

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
userSchema.virtual("user_tasks",{
    ref:"todo-collection",
    localField:"_id",
    foreignField:"owner"
})
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel