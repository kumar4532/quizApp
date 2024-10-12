import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createQuiz, getQuizzes, getQuizDetails, submitQuiz, getQuizResults } from "../controllers/quiz.controller.js";

const router = express.Router();

router.use(protectedRoutes);

router.post('/create/', createQuiz);
router.get('/details/:id', getQuizDetails);
router.get('/all/', getQuizzes);
router.post("/attempt/:id", submitQuiz);
router.get("/result/:id", getQuizResults)

export default router;