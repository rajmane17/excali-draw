import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import {JWT_SECRET} from "@repo/backend-common/config"

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer ", "")

    if(!accessToken){
        throw new Error("Unauthorized request")
    }

    const decodedToken = jwt.verify(accessToken, JWT_SECRET)

    if(!decodedToken){
        throw new Error("Unauthorized Token")
    }

    //Ideally we should make a db call over here using the id we got from jwt, and then attach the userDetails to req.user
    const user = decodedToken;

    //Google this. How can you update the Request object types
    req.user = user;
    next();
}

