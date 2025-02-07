import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { Level } from '../types';

interface LevelCardProps {
  level: Level;
  onSelect: (level: Level) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onSelect }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${
        level.unlocked
          ? 'bg-white hover:scale-105 cursor-pointer'
          : 'bg-gray-100 cursor-not-allowed'
      } transition-transform duration-200`}
      onClick={() => level.unlocked && onSelect(level)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-indigo-600">Level {level.id}</h3>
        {level.unlocked ? (
          <Trophy className="w-6 h-6 text-yellow-500" />
        ) : (
          <Lock className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <p className="text-gray-800 font-medium mb-2">{level.name}</p>
      <p className="text-gray-600 text-sm mb-4">{level.description}</p>
      <div className="mt-4 text-sm">
        <p className="text-indigo-600">Required Score: {level.requiredScore}</p>
        <p className="text-gray-500">Speed: {Math.round((150 - level.speed) / 150 * 100)}% faster</p>
      </div>
    </div>
  );
};

export default LevelCard;