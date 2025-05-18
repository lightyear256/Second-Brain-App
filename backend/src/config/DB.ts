import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // Adjust relative to compiled build location
});

export const Connection=async()=>{
    console.log(process.env.MONGOOSE_URI as string);
    try{
        await mongoose.connect(process.env.MONGOOSE_URI as string)
        console.log("Connected successfully");
    }
    catch(e){
        console.log("Not connected"+e);
    }
}