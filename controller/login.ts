import { Router }  from 'express';
import user from '../model/user';
import { body,check } from'express-validator';
import {gen_access_token, gen_refresh_token} from'./generate_token' ;
import  token_db from'../model/token';
const route = Router();

route.post('/login',async(req,res)=>{
  console.log(req.body);
  const result=await user.findOne({username:req.body.username})
  if(result==null)
  {
    return res.status(401).json('Incorrect Username')
  }
  else{
    if(result.password === req.body.password)
{   
    
    const tokens={
        access_token:gen_access_token(result._id.toString()),
        refresh_token:gen_refresh_token(result._id.toString())
            }
        const  new_token_db=new token_db(tokens)
        new_token_db.save()

        console.log(tokens);

        res.json(tokens)
    }
    else{
        res.status(401).json('Incorrect Password')
    }
  }

})

module.exports=route