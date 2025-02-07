import React from 'react';

interface ScoreMeterProps {
  currentScore: number;
  highScore: number;
  totalScore: number;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ currentScore, highScore, totalScore }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm opacity-80">Current Score</p>
          <p className="text-2xl font-bold">{currentScore}</p>
        </div>
        <div className="text-center border-x border-white/20">
          <p className="text-sm opacity-80">High Score</p>
          <p className="text-2xl font-bold">{highScore}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-80">Total Score</p>
          <p className="text-2xl font-bold">{totalScore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter