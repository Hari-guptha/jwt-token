import { Router }  from 'express';
import jwt from "jsonwebtoken";
import  token_db from '../model/token';
import {gen_access_token,gen_refresh_token}  from './generate_token';
const route = Router(); 

route.post('/refresh',(req,res)=>{
    console.log(req.body.token)
    if(req.body.token)
    {
        jwt.verify(req.body.token,'mern_auth_refresh_secret',(err: Error | null, user?: any)=>{
        
            if(err)
            {   console.log(err);
                return res.status(401).json("You are not authenticated1!");
            }
            token_db.findOne({refresh_token:req.body.token})
            .then((result?:any)=>{
                if(result)
                {
                const  access_tok= gen_access_token(user.id)
                const refresh_tok=gen_refresh_token(user.id)
                const tokens={
                            access_token:access_tok,
                            refresh_token:refresh_tok
                        }
                        result.access_token=access_tok
                        result.refresh_token=refresh_tok
                        result.save()
                        res.json(tokens)
                }
                else{
                    return res.status(401).json("You are not authenticated2!");
                }
            })
        }
        )
    }
    else{
        return res.status(401).json("You are not authenticated!");
    }

})
module.exports=route