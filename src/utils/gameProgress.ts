import { GameProgress } from '../types';
import { levels } from '../data/levels';

const STORAGE_KEY = 'snakequest_progress';

export const getGameProgress = (): GameProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    totalScore: 0,
    highScores: {},
    unlockedLevels: [1] // Level 1 is always unlocked
  };
};

export const updateGameProgress = (levelId: number, score: number): GameProgress => {
  const progress = getGameProgress();
  
  // Update high score for the level if necessary
  if (!progress.highScores[levelId] || score > progress.highScores[levelId]) {
    progress.highScores[levelId] = score;
  }

  // Update total score
  progress.totalScore = Object.values(progress.highScores).reduce((a, b) => a + b, 0);

  // Check for level unlocks
  const nextLevelId = levelId + 1;
  if (nextLevelId <= 15 && !progress.unlockedLevels.includes(nextLevelId)) {
    const nextLevel = levels.find(l => l.id === nextLevelId);
    if (nextLevel && progress.totalScore >= nextLevel.requiredScore) {
      progress.unlockedLevels.push(nextLevelId);
      progress.unlockedLevels.sort((a, b) => a - b);
    }
  }

  // Save progress
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

export const resetGameProgress = (): GameProgress => {
  const initialProgress: GameProgress = {
    totalScore: 0,
    highScores: {},
    unlockedLevels: [1]
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
  return initialProgress;
};