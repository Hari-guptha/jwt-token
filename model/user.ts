import mongoose from "mongoose";
const user_schema= new mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
},{versionKey:false})
const  user_model=mongoose.model('users',user_schema)

export default user_model