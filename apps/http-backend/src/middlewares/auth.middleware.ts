import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { prismaClient } from "@repo/db/client"
import { JWT_SECRET } from "@repo/backend-common/config"
import { ApiError } from "../utils/ApiError"

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!accessToken) {
      throw new ApiError(401, "Authorization token is required");
    }

    const decodedToken = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;

    if (!decodedToken?.userId) {
      throw new ApiError(401, "Invalid authorization token");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: (decodedToken as JwtPayload)?.userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true
      }
    })

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    //Google this, How can you update the Request object types
    req.user = user;
    next();
  } catch (error: any) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    }

  }
}

