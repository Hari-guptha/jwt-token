import { Router }  from 'express';
import token_db from '../model/token';
const route = Router()

route.post('/logout',(req,res)=>{
    console.log(req.body.refresh_token);
    if(req.body.refresh_token)
    {   
        token_db.findOneAndDelete({refresh_token:req.body.refresh_token})
        .then((result?: any)=>{
            console.log('in logout')
            console.log(result);
            if(result)
            {
                res.send('ok  success')
            }
            
            
        
        })
    }
})
module.exports=route