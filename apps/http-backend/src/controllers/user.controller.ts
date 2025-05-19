import { prismaClient } from "@repo/db/client";
import { userSchema, roomSchema, signInSchema } from "@repo/common/types";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants";
import { ApiResponse, ApiError, asyncHandler } from "../utils/index";

//More controllers can be add later on. like handleLogout, handleAvatarChange, forgotPassword, usernameExists, etc

export const handleUserSignup = asyncHandler(async (req: Request, res: Response) => {
    const { success, data: userData, error } = userSchema.safeParse(req.body);

    if (!success) {
        throw new ApiError(401, "Please enter all the fields")
    }

    const existingUser = await prismaClient.user.findFirst({
        where: {
            email: userData?.email
        }
    })

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);

    const createdUser = await prismaClient.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            username: userData.username,
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true
        }
    })

    if (!createdUser) {
        throw new ApiError(500, "user creation failed");
    }


    res
        .status(201)
        .json(
            new ApiResponse(201, {
                message: "user created successfully",
                user: createdUser
            })
        );

})

export const handleUserSignin = asyncHandler(async (req: Request, res: Response) => {
    const { success, data, error } = signInSchema.safeParse(req.body);

    if (!success) {
        throw new ApiError(401, "Please enter all the fields");
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!user) {
        throw new ApiError(404, "user doesn't exists. please sign up first");
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user?.password as string);

    if (!isPasswordCorrect) {
        throw new ApiError(403, "Incorrect password")
    }

    //creating a token
    const accessToken = jwt.sign({
        userId: user?.id,
        email: user?.email,
        username: user?.username
    }, JWT_SECRET, { expiresIn: "1d" })

    res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .json(
            new ApiResponse(200, {
                accessToken: accessToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar || ""
                }
            })
        )
})