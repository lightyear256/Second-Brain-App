import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import zod from 'zod'
import { UserModel } from "../model/Models";
import { checker, Linker, setter, usignIn, usignUp } from "../controller/user";
import { userMiddleware } from '../middlewares/userMiddleware';
import { contentRouter } from './contentRouter';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'), // Adjust relative to compiled build location
});

export const userRouter=Router();

userRouter.post("/signup",usignUp)
userRouter.post("/signin",usignIn)
userRouter.use(userMiddleware);
userRouter.put("/setter",setter as any)
userRouter.get("/checker", checker as any)
userRouter.get("/linker",Linker)
userRouter.use("/contents",contentRouter)


