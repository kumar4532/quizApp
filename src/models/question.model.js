import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit]
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
});

function arrayLimit(val) {
  return val.length === 4;
}

export const Question = mongoose.model('Question', questionSchema);