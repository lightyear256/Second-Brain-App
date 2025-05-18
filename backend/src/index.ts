import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from './model/Models';
import { userRouter } from './routes/userRoute';
import cors from 'cors'
import { shareRouter } from './routes/shareRouter';

export const app=express();
app.use(cors({
  origin: "*", // or your frontend domain
  credentials: true
}));

app.use(express.json());
app.use("/My-brain",shareRouter)
app.use("/user",userRouter);