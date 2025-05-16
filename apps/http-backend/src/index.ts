import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

//Route imports
import userRoute from "./routes/user.route"
import roomRoute from "./routes/room.route"

const app = express();
const PORT = process.env.PORT || 8000;

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
app.use(express.json({limit: "16Kb"}));
app.use(cookieParser());
app.use(express.static("public"));

//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);

app.listen(PORT, () => {
    console.log("Server started on Port ", PORT);
})