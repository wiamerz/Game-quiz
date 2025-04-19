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
`;

