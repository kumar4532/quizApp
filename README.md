# Quiz App
### This is a quizz application where you can create quizzes, add questions to quizzes and take quizzes.

## Table of Contents
- Features
- Technologies
- Project Setup
- Environment Variables
- Running the Application
- API Endpoints

## Features
* User Authentication: Secure login system using JWT tokens.
* Quiz Structure:
  1. Create quizzes with its title, description and questions.
  2. Each question is mcq type question having 4 options each.
  3. Taking the quizz you can select the correct option and get you result.
  4. Get all the quizzes.
* Error Handling: Proper error messages for invalid inputs or missing fields.

## Technologies
+ Backend: Node.js, Express.js, Mongoose
+ Database: MongoDB
+ Authentication: JWT for user authentication
+ Other Libraries:
  1. bcryptjs: For hashing passwords.
  2. dotenv: For environment variable management.
  3. cookie-parser: For handling cookies.

## Project Setup

**Installation**
Clone the repository:

```
git clone https://github.com/kumar4532/quizApp.git
```

Install dependencies:
```
npm install
```

Create a .env file in the root directory and add the following variables (see the Environment Variables section below).

Ensure MongoDB is running either locally or through a service like MongoDB Atlas.

### Environment Variables
Create a .env file in the root of your project and set the following variables:

```
PORT=<Any port>
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
```
> [!NOTE]
> PORT: Port where you can listen to your app.
> MONGO_URI: The connection string for your MongoDB instance.
> JWT_SECRET: A secret key for signing JWT tokens.

## Running the Application

Start the server in development mode:
```
npm run dev
```
This will run the server using nodemon, which automatically restarts the server upon file changes.

Production Mode
```
npm start
```

## API Endpoints
### Authentication

- Register User
```
POST /api/user/signup
```

Request Body:
json
```
{
  "fullname": "your-fullname",
  "username": "your-username",
  "password": "123456"
}
```

- Login User
```
POST /api/user/login
```

Request Body:
json
```
{
  "username": "your-username",
  "password": "123456"
}
```

- LogOut User
```
POST /api/user/logout
```

### Task Endpoints
- You need to be authenticated to perform any of the task operations.
- :id - will be the id of a quizz

- Create a Quiz
```
POST /api/quiz/create/
```
Request Body:
json
```
{
  "title": "JavaScript Basics",
  "description": "Test your knowledge of JavaScript fundamentals",
  "questions": [
    {
      "text": "What is a closure in JavaScript?",
      "options": ["A function", "A variable", "A data structure", "A programming paradigm"],
      "correctAnswer": 0
    },
    {
      "text": "Which keyword is used to declare a constant in JavaScript?",
      "options": ["var", "let", "const", "def"],
      "correctAnswer": 2
    }
  ]
}
```

- Get all quizzes
```
GET /api/quiz/all/
```

- Get details of a quiz
```
GET /api/quiz/details/:id
```

- Attempt a quiz
```
POST /api/quiz/attempt/:id
```
Request Body:
json
```
{
    "answers":[0,2]
}
```

- Get result of a quiz
```
GET /api/quiz/result/:id
```