import { Quiz } from "../models/quiz.model.js";
import { Question } from "../models/question.model.js";
import { QuizAttempt } from "../models/attempt.model.js";

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

export const submitQuiz = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const answers = req.body.answers;
    let score = 0;

    const attempt = new QuizAttempt({
      user: userId,
      quiz: quiz._id,
      answers: answers.map((answer, index) => ({
        question: quiz.questions[index]._id,
        selectedAnswer: answer
      }))
    });

    // Calculate the score
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answers[i] === quiz.questions[i].correctAnswer) {
        score++;
      }
    }

    attempt.score = score;
    await attempt.save();

    res.json({ 
      score, 
      totalQuestions: quiz.questions.length,
      message: 'Quiz submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizResults = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizId = req.params.id;

    const userAttempt = await QuizAttempt.findOne({ 
      quiz: quizId, 
      user: userId 
    });

    if (!userAttempt) {
      return res.status(403).json({ 
        message: 'You have not attempted this quiz yet. Results are only available after attempting the quiz.' 
      });
    }

    const attempts = await QuizAttempt.find({ 
      quiz: quizId, 
      user: userId 
    })
      .sort('-completedAt')
      .populate('quiz', 'title')
      .populate('answers.question', 'text');

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};