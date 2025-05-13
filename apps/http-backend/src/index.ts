import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { checkAuth } from "./middlewares/auth.middleware";
import jwt from "jsonwebtoken";
import {userSchema, roomSchema, signInSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
import bcrypt from "bcryptjs"

const app = express();
const PORT = process.env.PORT || 8000;

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

//Middlewares
app.use(cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
}));
app.use(express.urlencoded({
    extended: true, 
    limit: "16Kb"
}));
app.use(express.json({limit: "16Kb"}))
app.use(cookieParser())

app.post("/signup", async (req, res) => {
    try {
        const { success, data: userData, error } = userSchema.safeParse(req.body);

        if(!success){
            res
            .status(401)
            .json({
                message: "Please enter all the fields"
            })
            return;
        }

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: userData?.email
            }
        })

        if(existingUser){
            res
            .status(409)
            .json({
                message: "User with this email already exists"
            })
            return;
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(userData.password, salt);

        const createdUser = await prismaClient.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashPassword,
                username: userData.username,
            },
            select:{
                id: true,
                name: true,
                email: true,
                username: true
            }
        })

        if(!createdUser){
            res
            .status(500)
            .json({
                message: "user creation failed",
            })
        }

        res
        .status(201)
        .json({
            message: "user created successfully",
            user: createdUser
        });

    } catch (error: any) {
        console.log(error.message)
    }
})

app.post("/signin", async (req, res) => {
    const {success, data, error} = signInSchema.safeParse(req.body);

    if(!success){
        res
        .status(401)
        .json({
            message: "Please enter all the fields"
        })
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(!user){
            res
            .status(404)
            .json({
                message: "user doesn't exists. please sign-up first"
            })
            return; //the return statement is recomended bcz if we don't then the code will continue to run even though you have send the response
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user?.password as string);

        if(!isPasswordCorrect){
            res
            .status(403)
            .json({
                message: "Incorrect password"
            })
            return;
        }

        //creating a token
        const accessToken = jwt.sign({
            userId: user?.id,
            email: user?.email,
            username: user?.username
        }, process.env.JWT_SECRET!, {expiresIn: "1d"})

        res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .json({
            accessToken: accessToken,
            user
        })
        
    } catch (error: any) {
        console.log(error.message)
    }
})

app.post("/join-room", checkAuth, async(req, res) => {
    const {success, data, error} = roomSchema.safeParse(req.body);
    
    if(!success){
        res
        .status(401)
        .json({
            message: "Please enter all the fields"
        })
        return;
    }

    try {
        const userId = req.user?.id;

        const existingRoom = await prismaClient.room.findFirst({
            where: {
                slug: data.roomName
            }
        })

        if(existingRoom){
            res
            .status(409)
            .json({
                success: false,
                message: "A room with this name already exists"
            })
        }
    
        const newRoom = await prismaClient.room.create({
            data: {
                slug: data.roomName,
                createdBy: userId as number
            }
        })
    
        if(!newRoom){
            res
            .status(500)
            .json({
                success: false,
                message: "Error creating a room"
            })
        }
    
        res
        .status(200)
        .json({
            success: true,
            message: "room created successfully",
            roomDetails: newRoom
        })
    } catch (error) {
        console.log(error)
    }

})

app.listen(PORT, () => {
    console.log("Server started on Port ", PORT);
})

