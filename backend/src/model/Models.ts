import mongoose,{Schema,Model,Document,Types, ObjectId} from 'mongoose';
import { boolean } from 'zod';
const {ObjectId}=Schema.Types;
interface User extends Document{
    email:string;
    password:string;
    name:string,
    shared:boolean,
}
interface Content extends Document{
    link:string;
    type:string;
    title:string;
    share:Boolean;
    tags:ObjectId[];
    userId:ObjectId
}

interface Tags extends Document{
    title:string
}

interface Link extends Document{
    hash:string;
    userId:ObjectId
}

const UserSchema=new Schema<User>({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    name:{type:String ,required:true},
    shared:{type:Boolean,default:false}
})

export const ContentTypes=['youtube',"twitter"] as const
const ContentSchema=new Schema<Content>({
    link:{type:String},
    type:{type:String , enum: ContentTypes, required:true},
    title:{type:String,required:true},
    tags:[{type:ObjectId , ref:'Tags'}],
    share:{type:Boolean,default:false},
    userId:{type:ObjectId , ref:"User",required:true}
})

const TagsSchema= new Schema<Tags>({
    title:{type:String,required:true,unique:true}
})

const LinkSchema= new Schema<Link>({
    hash:{type:String,required:true},
    userId:{type:ObjectId,ref:"User",required:true}
})

export const UserModel: Model<User> = mongoose.model<User>("User",UserSchema)
export const ContentModel: Model<Content>=mongoose.model<Content>("Content",ContentSchema)
export const TagsModel: Model<Tags>=mongoose.model<Tags>("Tags",TagsSchema)
export const LinkModel: Model<Link>=mongoose.model<Link>("Link",LinkSchema)



