import { Express,Response,Request,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // Adjust relative to compiled build location
});

export interface AuthenticatorRequest extends Request{
    user?:{
        userId:string;
        email:string;
    }
}

export const userMiddleware= async(req:AuthenticatorRequest,res:Response,next:NextFunction)=>{
    const token =req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        res.status(403).send({
            msg:"token not found"
        })
        return
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_USER as string) as{
            userId:string;
            email:string
        }
        req.user=decoded;
        next();
    } catch (error) {
        res.status(403).send({
            msg:"Token Invalid"
        })
    }

}