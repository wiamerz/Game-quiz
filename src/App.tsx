import React, { useState, useEffect } from 'react';
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

// Type for saved quiz state
export type SavedQuizState = {
  questions: QuestionState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  playerName: string;
};

const TOTAL_QUESTIONS = 10;

// Name Component
const Name: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a saved session with the name
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const parsedState: SavedQuizState = JSON.parse(savedState);
      setName(parsedState.playerName || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Check if there's a saved session for this name
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        const parsedState: SavedQuizState = JSON.parse(savedState);
        if (parsedState.playerName === name) {
          // If the name matches the saved session, update the name and navigate
          const updatedState = { ...parsedState, playerName: name };
          localStorage.setItem('quizState', JSON.stringify(updatedState));
          navigate('/quiz');
          return;
        }
      }
      
      // If no saved session or different name, start fresh
      const newState: SavedQuizState = {
        questions: [],
        number: 0,
        userAnswers: [],
        score: 0,
        playerName: name
      };
      localStorage.setItem('quizState', JSON.stringify(newState));
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
        <button type="submit" className="start">
          {name && localStorage.getItem('quizState') && 
           JSON.parse(localStorage.getItem('quizState') || '{}').playerName === name 
            ? 'Continue Quiz' 
            : 'Start Quiz'}
        </button>
      </form>
    </Wrapper>
  );
};

// Quiz Component
const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  // Load saved state or redirect to name entry
  useEffect(() => {
    const savedStateString = localStorage.getItem('quizState');
    if (!savedStateString) {
      navigate('/');
      return;
    }

    const savedState: SavedQuizState = JSON.parse(savedStateString);
    setPlayerName(savedState.playerName);

    // If we have answered questions, restore the state
    if (savedState.userAnswers.length > 0 && savedState.questions.length > 0) {
      setQuestions(savedState.questions);
      setNumber(savedState.number);
      setUserAnswers(savedState.userAnswers);
      setScore(savedState.score);
      setGameOver(false);
      setLoading(false);
    }
  }, [navigate]);

  // Save state when any relevant state changes
  useEffect(() => {
    if (playerName) {
      const stateToSave: SavedQuizState = {
        questions,
        number,
        userAnswers,
        score,
        playerName
      };
      localStorage.setItem('quizState', JSON.stringify(stateToSave));
    }
  }, [questions, number, userAnswers, score, playerName]);

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

  const newQuiz = () => {
    // Clear saved state and start fresh
    const freshState: SavedQuizState = {
      questions: [],
      number: 0,
      userAnswers: [],
      score: 0,
      playerName
    };
    localStorage.setItem('quizState', JSON.stringify(freshState));
    startTrivia();
  };

  const switchPlayer = () => {
    // Clear saved state completely
    localStorage.removeItem('quizState');
    navigate('/');
  };

  return (
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {playerName && <p className="player-name">Player: {playerName}</p>}
      
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <div>
          {userAnswers.length === TOTAL_QUESTIONS && (
            <h2>Game Over! Your score: {score}/{TOTAL_QUESTIONS}</h2>
          )}
          <button className='start' onClick={newQuiz}>
            {userAnswers.length === TOTAL_QUESTIONS ? 'Play Again' : 'Start Quiz'}
          </button>
          <button className='restart' onClick={switchPlayer}>
            Switch Player
          </button>
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