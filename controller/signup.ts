import { Router }  from 'express';
import  user from '../model/user';
const route = Router();

route.post('/signup',(req,res)=>{ 
  console.log('this is signup')
  const signup =new user(req.body)
  signup.save().then(()=>{
    console.log(req.body.username)
  });
  res.sendStatus(200)
})

module.exports=route