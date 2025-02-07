import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import { Level } from '../types';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { levels } from '../data/levels';
import { getGameProgress, resetGameProgress } from '../utils/gameProgress';

const FloatingBubble: React.FC<{ x: number; y: number; size: number; color: string }> = ({ x, y, size, color }) => (
  <div 
    className="absolute rounded-full animate-float cursor-pointer transition-transform hover:scale-110"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      opacity: 0.3,
      filter: 'blur(8px)',
      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
    }}
  />
);

const Levels: React.FC = () => {
  const navigate = useNavigate();
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [bubbles] = useState(() => 
    Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 100,
      color: `hsl(${Math.random() * 60 + 220}, 70%, 50%)`,
    }))
  );

  useEffect(() => {
    const progress = getGameProgress();
    setUnlockedLevels(progress.unlockedLevels);
    setTotalScore(progress.totalScore);
  }, []);

  const handleLevelSelect = (level: Level) => {
    if (unlockedLevels.includes(level.id)) {
      // Only allow selecting consecutive levels
      const maxUnlockedLevel = Math.max(...unlockedLevels);
      if (level.id <= maxUnlockedLevel) {
        navigate(`/game/${level.id}`);
      }
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      const progress = resetGameProgress();
      setUnlockedLevels(progress.unlockedLevels);
      setTotalScore(progress.totalScore);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 relative overflow-hidden">
      {/* Interactive background bubbles */}
      {bubbles.map((bubble, i) => (
        <FloatingBubble key={i} {...bubble} />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-indigo-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Welcome
          </button>
          <div className="flex items-center gap-4">
            <p className="text-white font-medium">Total Score: {totalScore}</p>
            <button
              onClick={handleResetProgress}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Progress
            </button>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Choose Your Level
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={{
                ...level,
                unlocked: unlockedLevels.includes(level.id)
              }}
              onSelect={handleLevelSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Levels;