import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { checkAuth } from "./middlewares/auth.middleware";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import {userSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"

const app = express();
const PORT = process.env.PORT || 8000;

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

app.post("/sign-up", (req, res) => {
    //get the user details
    //validate the user details
    //check if the user already exists or not
    // if yes throw a error
    // else validate the details and create a user
    // for precaution again make a db query and check if the user is created successfully
    // if yes return the user else throw a error
    try {
        userSchema.parse(req.body);
        const { success, data, error } = userSchema.safeParse(req.body);

        if(!success){
            res.json({
                message: "Incorrect Inputs"
            })
        }

        res.json(data);

    } catch (error: any) {
        console.log(error.message)
    }
})

app.post("/sign-in", (req, res) => {
    try {
        //get the details
        //check if all details are present
        //get the details and make a db query
        //if user found return the user else throw a error
        // if user found then check if the entered password is correct or not
        //if not, throw error
        //else make a accessToken and return the userdetails and token and redirect to home page

        const accessToken = jwt.sign({
            userId: 1
        }, JWT_SECRET)

        res.json({
            accessToken: accessToken,
            user: {
                name: "Raj Mane",
                username: "Raj_84",
                email:"rajmane9594@gmail.com"
            }
        })
        
    } catch (error: any) {
        console.log(error.message)
    }
})

app.post("/join-room", checkAuth, (req, res) => {})

app.listen(PORT, () => {
    console.log("Server started on Port ", PORT);
})

