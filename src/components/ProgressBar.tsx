import React from 'react';
import styled from 'styled-components';

type ProgressBarProps = {
  currentQuestion: number;
  totalQuestions: number;
};

const ProgressBarContainer = styled.div `
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #56ccff, #6eafb4);
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const PercentageText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0px 0px 2px rgba(255, 255, 255, 0.7);
  pointer-events: none;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const formattedProgress = Math.round(progress);
  
  return (
    <ProgressBarContainer>
      <Progress width={progress} />
      <PercentageText>{formattedProgress}%</PercentageText>
    </ProgressBarContainer>
  );
};

export default ProgressBar;