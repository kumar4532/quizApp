import { Quiz } from "../models/quiz.model.js";
import { Question } from "../models/question.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    
    const createdQuestions = await Question.create(questions);
    
    const quiz = new Quiz({
      title,
      description,
      questions: createdQuestions.map(q => q._id)
    });
    
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title description');
    
    if (quizzes.length <= 0) {
        return res.status(400).json("There aren't any present quizzes");
    }

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};