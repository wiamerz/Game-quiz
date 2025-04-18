import { shuffleArray } from './utils';


export type Question = {
     category: string;
     correct_answer: string;
     difficulty: string;
     incorrect_answers: string[]
     question: string;
     type: string;
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',


}

export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty
  ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
      
      // Check if data and data.results exist and are valid
      if (data && data.results && Array.isArray(data.results)) {
        return data.results.map((question: Question) => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
      } else {
        console.error('Invalid API response format:', data);
        return []; // Return empty array as fallback
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      return []; // Return empty array on error
    }
  };