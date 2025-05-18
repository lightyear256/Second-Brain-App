import { Response,Request } from 'express';
import { ContentModel, LinkModel } from '../model/Models';
import { z } from 'zod';
import { contentSchema } from '../schemas/ContentSchema';
import {AuthenticatorRequest} from '../middlewares/userMiddleware'
import bcrypt from 'bcrypt';
import { RandomHash } from '../utils/Utils';
export const fetch=async(req:AuthenticatorRequest,res:Response)=>{
    const userId=req.user?.userId;
    try {
        const data=await ContentModel.find({
            userId:userId
        }).populate("userId","name")
        if(!data){
            res.send({
                msg:"No data found"
            })
            return
        }
        res.send({
            data:data,
            msg:"data found"
        })
    } catch (error) {
        res.status(500).send({
            msg:"Internal server Error"
        })
    }
}
type Content=z.infer<typeof contentSchema>
export const createContent=async(req:AuthenticatorRequest,res:Response)=>{
    const result=contentSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send({
        msg: result.error.flatten(),
      });
      return;
    }
    try {
        const {link,type,title}:Content=result.data
        const userId=req.user?.userId;
        await ContentModel.create({
            link,
            type,
            title,
            tags:[],
            userId,
        })
        res.send({
            msg:"data added successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            msg:"Internal server error"+error
        })
    }
}
export const deleteContent=async(req:AuthenticatorRequest,res:Response)=>{
    const k=req.body._id;
    const userId=req.user?.userId;
    console.log({k,userId});
    try {
        const p=await ContentModel.findOneAndDelete({
            _id:k,
            userId:userId
        })
        if(!p){
            res.status(403).send({
                msg:"unAuthorised action"
            })
            return;
        }
        res.send({
            msg:"data deleted sucessfully",
        })
    } catch (error) {
        res.status(500).send({
            msg:"Internal server Error"
        })
    }

}
export const shareContent=async(req:AuthenticatorRequest,res:Response)=>{
    const share:boolean=req.body.share;
    const userId=req.user?.userId;
    const hash=RandomHash(11)
    if(share){
        try{
            const user=await LinkModel.findOne({
                userId:userId
            })
            if(user){
                res.status(411).send({
                    msg:"Link already created"
                })
                return;
            }
            await LinkModel.create({
                hash:hash,
                userId:userId
            })
        res.send({
            msg:"link created",
            hash:hash,
            link:`http://localhost:5000/My-brain/share/brain/${hash}`
        })
    }catch(e){
        res.status(500).send({
            msg:"internal server error"
        })
    }
    }
    else{
        try {
            
            await LinkModel.deleteOne({
                userId:userId
            })
            res.send({
                msg:"link deleted"
            })
        } catch (error) {
            res.status(500).send({
                msg:"internal server error"
            })
        }
    }
}
