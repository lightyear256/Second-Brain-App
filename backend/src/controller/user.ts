import { userSignInSchema, userSignUpSchema } from "../schemas/UserSchema";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import { LinkModel, UserModel } from "../model/Models";
import z from "zod";
import { AuthenticatorRequest } from '../middlewares/userMiddleware';
type User = z.infer<typeof userSignUpSchema>;
export const usignUp = async (req: Request, res: Response) => {
  try {
    const result = userSignUpSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send({
        msg: result.error.flatten(),
      });
      return;
    }
    const { email, password, name }: User = result.data;

    try {
      const user = await UserModel.findOne({
        email: email,
      });
      if (!user) {
        const hashedpass = await bcrypt.hash(password, 10);
        await UserModel.create({
          email,
          password: hashedpass,
          name,
        });
        res.status(200).send({
          msg: "data added successfully",
        });
      } else {
        res.status(411).send({
          msg: "user already exits",
        });
      }
    } catch (error) {
      res.status(500).send({
        msg: "internal server error",
      });
    }
  } catch (e) {
    res.status(500).send({
      msg: "internal server error",
    });
  }
};

export const usignIn = async (req: Request, res: Response) => {
  const result = userSignInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send({
      msg: result.error.flatten(),
    });
    return;
  }
  const { email, password } = result.data;
  try {
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      res.send({
        msg: "user not found",
      });
      return;
    }
    const success = await bcrypt.compare(password, user.password);
    if (!success) {
      res.status(403).send({
        msg: "Either Email or Password is Incorrect",
      });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JWT_SECRET_USER as string,
      { expiresIn: "24h" }
    );
    res.send({
      msg: "login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const checker=async(req:AuthenticatorRequest,res:Response)=>{
  const userId=req.user?.userId;
  try {
    const user = await UserModel.findOne({
      _id:userId,
    });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.send({
      share: user.shared
    });
  } catch (error) {
    res.status(500).send({
            msg:"Internal server Error"
        })
  }
}
export const setter = async (req: AuthenticatorRequest, res: Response) => {
  const userId = req.user?.userId;
  const shared = req.body.shared; 

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { shared: shared } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    res.send({
      msg: "done",
      shared: user.shared,
    });
  } catch (error) {
    res.status(500).send({
      msg: "Internal server Error",
    });
  }
};

export const Linker = async (req: AuthenticatorRequest, res: Response) => {
  const userId = req.user?.userId;
  try{
    const link= await LinkModel.findOne({
      userId:userId
    })
    if(!link){
      res.send({
        msg:"link not hound"
      })
      return
    }
    res.send({
      hash:link.hash
    })
  }catch(e){
    res.status(500).send({
      msg:"Internal server Error"
    })
  }
}