import jwt from "jsonwebtoken";
import token_db from'../model/token';
import { Request, Response, NextFunction } from 'express';


const  verify=(req : Request,res :Response,next :NextFunction)=>{
console.log('in verify');
    const token=req.body.access_token
    console.log(token);
    if(token)
    {   token_db.findOne({access_token:token})
        .then((result?: any)=>{
            
            if(result)
            {
            console.log(result,'this is result')
                jwt.verify(token,`${process.env.Access_secret}`,(err: Error | null, user?: any)=>{
                    if(err)
                    {
                        console.log(err)
                    return res.status(403).json('your  not authenticated1')
    
                    }
                    else{
                        req.user = user
                        next()
                    }
                })
            }
            else{
            return res.status(403).json('your  not authenticated3')

            }
        })
            
    }
    else{
        return res.status(403).json('your  not authenticated2')
    }

}



module.exports=verify