import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import {  Wrapper } from '../App.styles';
import { AnswerObject, SavedQuizState, TOTAL_QUESTIONS } from '../types';
import { QuestionState, Difficulty,  fetchQuizQuestions } from '../API';
import { useNavigate, Link } from 'react-router-dom';


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

      // Navigate to results when game is over and all questions are answered
  useEffect(() => {
    if (gameOver && userAnswers.length === TOTAL_QUESTIONS) {
      navigate('/results');
    }
  }, [gameOver, userAnswers.length, navigate]);
  
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
            {userAnswers.length === TOTAL_QUESTIONS && (
            <Link to="/results" className="results-link">
              View Detailed Results
            </Link>
          )}
          </div>
        )}
        
        {!gameOver && <p className='score'>Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}
  
        {/* ----------------- Progress bar ----------------- */}
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

export default Quiz