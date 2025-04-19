import { QuestionState } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// Type for saved quiz state
export type SavedQuizState = {
  questions: QuestionState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  playerName: string;
};

export const TOTAL_QUESTIONS = 10;