import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createQuiz, getQuizzes, getQuizDetails } from "../controllers/quiz.controller.js";

const router = express.Router();

router.use(protectedRoutes);

router.post('/create/', createQuiz);
router.get('/details/:id', getQuizDetails);
router.get('/all/', getQuizzes);

export default router;