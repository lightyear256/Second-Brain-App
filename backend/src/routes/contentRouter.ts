import { Router, Response,Request } from "express";
import jwt from 'jsonwebtoken';
import { createContent, deleteContent, fetch ,shareContent } from "../controller/content";
export const contentRouter=Router();

contentRouter.get("/",fetch);
contentRouter.post("/create",createContent)
contentRouter.post("/share",shareContent)
contentRouter.delete("/delete",deleteContent)