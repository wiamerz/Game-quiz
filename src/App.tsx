import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';

//components
import QuestionCard from './components/QuestionCard'
// types
 import { QuestionState, Difficulty } from './API';

 type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
 }
const TOTAL_QUESTIONS = 10;
const App = () => {
  const [Loading, setLoading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setNumber ] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setquestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);


  } 

  //check answer function
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer 
      const correct = questions[number].correct_answer === answer;
      // add scpre if answer is correct
      if (correct) setScore((prev) => + 1);
      //save answer in the array for user answers
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }

  }

  //pass to nest question function
  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  };

  return (
    <div className='App'>
      <h1>RECT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?  (
        <button className='start' onClick={startTrivia}>
           Start
        </button>
      ): null}
      {!gameOver ? <p className='score'>Score</p> : null}
      {Loading && <p>Loading Questions ...</p>}
      {!Loading && !gameOver && (
      
      <QuestionCard
        questionNr={number + 1}
        totalQuestions = {TOTAL_QUESTIONS}
        question = {questions[number].question}
        answers={questions[number].answers}
        userAnswer= {userAnswers ? userAnswers[number] : undefined}
        callback= {checkAnswer}
      /> 
    )}
      {!gameOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <button className='next' onClick={nextQuestion}>
        Next question
      </button>
      ) : null}



      
    </div>
  );
}

export default App