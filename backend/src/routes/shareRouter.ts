import { Router } from "express"
import { shareFetcher } from "../controller/share";

export const shareRouter=Router();

shareRouter.get("/share/brain/:hash",shareFetcher)