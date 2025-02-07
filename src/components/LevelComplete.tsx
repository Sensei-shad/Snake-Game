import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Repeat, ArrowRight } from 'lucide-react';
import { getGameProgress } from '../utils/gameProgress';

interface LevelCompleteProps {
  score: number;
  nextLevelId: number;
  onRestart: () => void;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ score, nextLevelId, onRestart }) => {
  const navigate = useNavigate();
  const { unlockedLevels } = getGameProgress();

  // Automatically navigate to next level when unlocked
  useEffect(() => {
    if (unlockedLevels.includes(nextLevelId)) {
      const timer = setTimeout(() => {
        window.location.href = `/game/${nextLevelId}`; // Force page reload for fresh state
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [nextLevelId, unlockedLevels]);

  const handleNextLevel = () => {
    if (unlockedLevels.includes(nextLevelId)) {
      window.location.href = `/game/${nextLevelId}`; // Force page reload for fresh state
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && unlockedLevels.includes(nextLevelId)) {
        handleNextLevel();
      } else if (e.key === 'r' || e.key === 'R') {
        onRestart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextLevelId, onRestart, unlockedLevels]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform animate-fade-in relative overflow-hidden">
        <div className="text-center relative z-10">
          <PartyPopper className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-4">
            You've completed this level with a score of {score}!
          </p>
          <p className="text-indigo-600 font-medium mb-6">
            {unlockedLevels.includes(nextLevelId) 
              ? "Opening next level automatically..."
              : "Keep playing to unlock the next level!"}
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRestart}
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg
                       hover:bg-gray-200 transition-colors"
              title="Press 'R' to restart current level"
            >
              <Repeat className="w-5 h-5 mr-2" />
              Restart Level
            </button>
            <button
              onClick={handleNextLevel}
              disabled={!unlockedLevels.includes(nextLevelId)}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors
                ${unlockedLevels.includes(nextLevelId)
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              title={unlockedLevels.includes(nextLevelId) ? "Press 'Enter' to continue" : "Not yet unlocked"}
            >
              Next Level
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;