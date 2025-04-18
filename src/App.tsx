import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from './API';

// components
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';

// styles
import { GlobalStyle, Wrapper } from './App.styles';

// types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

// Name page
const Name: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Store the name in localStorage 
      localStorage.setItem('playerName', name);
      navigate('/quiz');
    }
  };

  return (
    <Wrapper>
      <h1>REACT QUIZ</h1>
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="name-input"
        />
        <button type="submit" className="start">Start Quiz</button>
      </form>
    </Wrapper>
  );
};

// Quiz Component (your original App functionality)
const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const navigate = useNavigate();

  // Check if player has a name
  React.useEffect(() => {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
      navigate('/');
    }
  }, [navigate]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Check answer function
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // Next question function
  const nextQuestion = () => {
    const nextQuestionIndex = number + 1;

    if (nextQuestionIndex === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionIndex);
    }
  };

  const restartQuiz = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <div>
          {userAnswers.length === TOTAL_QUESTIONS && (
            <h2>Game Over! Your score: {score}/{TOTAL_QUESTIONS}</h2>
          )}
          <button className='start' onClick={startTrivia}>
            {userAnswers.length === TOTAL_QUESTIONS ? 'Play Again' : 'Start'}
          </button>
          {userAnswers.length === TOTAL_QUESTIONS && (
            <button className='restart' onClick={restartQuiz}>
              New Player
            </button>
          )}
        </div>
      )}
      {!gameOver && <p className='score'>Score: {score}</p>}
      {loading && <p>Loading Questions...</p>}

      {/* Progress bar - only show when game is active */}
      {!loading && !gameOver && questions.length > 0 && (
        <ProgressBar
          currentQuestion={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      )}

      {!loading && !gameOver && questions.length > 0 && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers[number]}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </Wrapper>
  );
};

// Main App component with routing
const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Name />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;