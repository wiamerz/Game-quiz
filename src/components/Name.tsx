import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../App.styles';
import { SavedQuizState } from '../types';


const Name: React.FC = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
  
    // useEffect(() => {
      
    //   const savedState = localStorage.getItem('quizState');
    //   if (savedState) {
    //     const parsedState: SavedQuizState = JSON.parse(savedState);
    //     setName(parsedState.playerName || '');
    //   }
    // }, []);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim()) {
       
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

export default Name