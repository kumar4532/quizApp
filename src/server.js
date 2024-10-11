import express from "express";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from './routers/user.routes.js'
import quizRoutes from "./routers/quiz.routes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })