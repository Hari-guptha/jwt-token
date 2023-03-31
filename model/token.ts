import mongoose from "mongoose";
const  token_schema=new mongoose.Schema({
    access_token:{
        type:String,
        required:false
    },
    refresh_token:{
        type:String,
        required:false
}
},{versionKey:false})

const  token_model=mongoose.model('tokens',token_schema)

export default token_model