import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wrapper } from '../App.styles';
import { SavedQuizState, TOTAL_QUESTIONS } from '../types';

const Results: React.FC = () => {
  const [results, setResults] = useState<SavedQuizState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStateString = localStorage.getItem('quizState');
    if (!savedStateString) {
      navigate('/');
      return;
    }

    const savedState: SavedQuizState = JSON.parse(savedStateString);
    setResults(savedState);
  }, [navigate]);

  const newQuiz = () => {
    if (results) {
      const freshState: SavedQuizState = {
        questions: [],
        number: 0,
        userAnswers: [],
        score: 0,
        playerName: results.playerName
      };
      localStorage.setItem('quizState', JSON.stringify(freshState));
      navigate('/quiz');
    }
  };

  const switchPlayer = () => {
    localStorage.removeItem('quizState');
    navigate('/');
  };

  if (!results) {
    return <p>Loading results...</p>;
  }

  return (
    <Wrapper>
      <h1>Quiz RESULTS</h1>
      <h2>Player: {results.playerName}</h2> {/* ✅ fixed */}
      <div className='results-summary'>
        <p className='score-big'>Final Score: {results.score}/{TOTAL_QUESTIONS}</p> {/* ✅ fixed */}
        <p>Correct Answers: {results.score}</p>
        <p>Incorrect Answers: {TOTAL_QUESTIONS - results.score}</p>
        <p>Percentage: {Math.round((results.score / TOTAL_QUESTIONS) * 100)}%</p>
      </div>

      <div className='results-details'>
        <h3>Details Results</h3>
        {results.userAnswers.map((answer, index) => ( // ✅ fixed
          <div key={index} className={`result-item ${answer.correct ? 'correct' : 'wrong'}`}>
            <h4>Question {index + 1}</h4>
            <p  className="question" dangerouslySetInnerHTML={{ __html: answer.question }} />
            <p className="user-answer">
              Your answer: <span className={answer.correct ? 'correct-text' : 'wrong-text'}>
                {answer.answer}
              </span>
            </p>
            {!answer.correct && (
              <p className="correct-answer">
                Correct answer: <span className="correct-text">{answer.correctAnswer}</span>
              </p>
            )}
            <p className="result-explanation">
              {answer.correct
                ? '✅ Correct! Well done!'
                : '❌ Incorrect. Keep learning!'}
            </p>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="start" onClick={newQuiz}>
          Play Again
        </button>
        <button className="restart" onClick={switchPlayer}>
          Switch Player
        </button>
        <Link to="/quiz" className="back-link">
          Back to Quiz
        </Link>
      </div>
    </Wrapper>
  );
};

export default Results;
