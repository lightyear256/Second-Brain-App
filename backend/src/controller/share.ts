import { Response,Request } from "express"
import { ContentModel, LinkModel } from "../model/Models";
// import { Hash } from 'lucide-react';
export const shareFetcher=async(req:Request,res:Response)=>{
    console.log();
    interface LinkSchema{
        hash:string,
        userId:string
    }
    const sharelink=req.params.hash;
    try {
        const link = await LinkModel.findOne({
            hash:sharelink
        }) as LinkSchema
        if(!link){
            res.status(404).send({
                msg:"page not found",
            })
            return 
        }
        const content=await ContentModel.find({
            userId:link.userId
        })
        res.send({
            data:content,
            msg:"data found"
        })
    } catch (error) {
        res.status(500).send({
            msg:"internal server error"
        })
    }
}