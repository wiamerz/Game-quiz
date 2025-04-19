import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/Jeju .jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  
  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > p {
    color: #fff;
  }
  
  .score {
    color: #000000;
    font-size: 2rem;
    margin: 0;
  }
  
  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #000000, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }
  
  h2 {
    color: #fff;
    font-size: 2rem;
    text-shadow: 1px 1px 2px #0085a3;
    margin: 10px;
    text-align: center;
  }
  
  .start, .next, .restart {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .start {
    max-width: 200px;
  }
  
  .restart {
    background: linear-gradient(180deg, #ffffff, #ff9191);
    border: 2px solid #d35858;
    margin-left: 10px;
  }
  
  /* Name input styling */
  .name-input {
    width: 100%;
    max-width: 300px;
    padding: 12px 15px;
    margin: 10px 0;
    border: 2px solid #0085a3;
    border-radius: 10px;
    font-size: 16px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #00aeff;
      box-shadow: 0px 5px 15px rgba(0, 133, 163, 0.3);
    }
  }
  
  /* Form styling */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
  }
  
  /* Player name display */
  .player-name {
    background-color: rgba(255, 255, 255, 0.8);
    color: #0085a3;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
    margin: 5px 0 15px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* Game over message */
  h2.game-over {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px 20px;
    border-radius: 10px;
    color: #d38558;
    text-shadow: none;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  }
  
  /* Container for buttons */
  .button-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0;
  }


/* results style */
.results-summary {
  background: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
}

.score-big {
  font-size: 2.5rem;
  color: #56ffa4;
  margin: 10px 0;
}

.results-details {
  width: 100%;
}

.result-item {
  background: #ebfeff;
  border-radius: 10px;
  margin: 15px 0;
  padding: 15px;
  color: #fff;
  position: relative;
}

.result-item.correct {
  border-left: 5px solid #56ffa4;
}

.result-item.wrong {
  border-left: 5px solid #ff5656;
}

.result-item h4 {
  margin-top: 0;
  color: #56ffa4;
  
}

.question {
  
  color:rgb(3, 3, 3);

  
}

.user-answer, .correct-answer {
  margin: 10px 0;
  color:rgb(3, 3, 3);
}

.correct-text {
  color: #56ffa4;
  font-weight: bold;
}

.wrong-text {
  color: #ff5656;
  font-weight: bold;
}

.result-explanation {
  font-style: italic;
  margin-top: 15px;
  color:rgb(3, 3, 3);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 20px;
}

.back-link, .results-link {
  display: inline-block;
  background: linear-gradient(180deg, #fff, #91c2ff);
  border: 2px solid #5897d3;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 40px;
  margin: 10px 0;
  padding: 8px 40px;
  text-decoration: none;
  color: #000;
  font-size: 16px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 40px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .start, .next, .restart, .back-link, .results-link {
    width: 100%;
    margin: 5px 0;
  }
}
`;