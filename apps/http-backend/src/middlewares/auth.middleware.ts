import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { prismaClient } from "@repo/db/client"

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
 try {
       const accessToken = req.cookies?.accessToken|| req.header("Authorization")?.replace("Bearer ", "")
   
       if (!accessToken) {
            res.status(401).json({
             success: false,
             message: "Authorization token is required",
           });
           return;
         }
   
       const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
   
       if (!decodedToken?.userId) {
            res.status(401).json({
             success: false,
             message: "Invalid authorization token",
           });
           return
         }
   
       const user = await prismaClient.user.findFirst({
           where: {
               id: (decodedToken as JwtPayload)?.userId
           },
           select:{
               id: true,
               name: true,
               email: true,
               username: true
           }
       })
   
       if (!user) {
            res.status(404).json({
             success: false,
             message: "User not found",
           });
           return;
         }
   
       //Google this, How can you update the Request object types
       req.user = user;
       next();
 } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token expired",
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
    return;
 }
}

