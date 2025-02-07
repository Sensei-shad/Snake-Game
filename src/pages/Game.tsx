import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import ScoreMeter from '../components/ScoreMeter';
import LevelComplete from '../components/LevelComplete';
import { GameState, Position } from '../types';
import { ArrowLeft } from 'lucide-react';
import { levels } from '../data/levels';
import { getGameProgress, updateGameProgress } from '../utils/gameProgress';

const BOARD_SIZE = 20;

const createInitialState = (levelId: number, levelSpeed: number, obstacles: Position[]): GameState => ({
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 15 },
  direction: 'RIGHT',
  gameOver: false,
  score: 0,
  level: levelId,
  speed: levelSpeed,
  obstacles: obstacles,
  highScore: getGameProgress().highScores[levelId] || 0,
  levelComplete: false
});

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const [gameState, setGameState] = useState<GameState>(() => {
    const currentLevel = levels.find(l => l.id === Number(levelId));
    return createInitialState(
      Number(levelId),
      currentLevel?.speed || 200,
      currentLevel?.obstacles || []
    );
  });
  const [isPaused, setIsPaused] = useState(false);
  const [totalScore, setTotalScore] = useState(() => getGameProgress().totalScore);

  const currentLevel = levels.find(l => l.id === Number(levelId));
  const nextLevel = levels.find(l => l.id === Number(levelId) + 1);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      gameState.snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      ) ||
      (gameState.obstacles && gameState.obstacles.some(
        (obstacle) => obstacle.x === newFood.x && obstacle.y === newFood.y
      ))
    );
    return newFood;
  }, [gameState.snake, gameState.obstacles]);

  const moveSnake = useCallback(() => {
    if (gameState.gameOver || isPaused || gameState.levelComplete) return;

    setGameState(prevState => {
      const newSnake = [...prevState.snake];
      const head = { ...newSnake[0] };

      // Update head position based on direction
      switch (prevState.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
      ) {
        return { ...prevState, gameOver: true };
      }

      // Check collision with self
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        return { ...prevState, gameOver: true };
      }

      // Check collision with obstacles
      if (
        prevState.obstacles?.some(
          (obstacle) => obstacle.x === head.x && obstacle.y === head.y
        )
      ) {
        return { ...prevState, gameOver: true };
      }

      // Add new head
      newSnake.unshift(head);

      // Check if food is eaten
      let newFood = prevState.food;
      let newScore = prevState.score;
      let shouldGenerateFood = false;

      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        newScore = prevState.score + 10;
        shouldGenerateFood = true;
      } else {
        newSnake.pop(); // Remove tail if food wasn't eaten
      }

      // Generate new food position if needed
      if (shouldGenerateFood) {
        newFood = generateFood();
        const progress = updateGameProgress(Number(levelId), newScore);
        setTotalScore(progress.totalScore);
      }

      // Check if level is complete
      const nextLevelRequirement = nextLevel?.requiredScore || Infinity;
      const levelComplete = newScore >= nextLevelRequirement;

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        highScore: Math.max(newScore, prevState.highScore),
        levelComplete
      };
    });
  }, [gameState.gameOver, gameState.levelComplete, isPaused, generateFood, levelId, nextLevel]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.gameOver || gameState.levelComplete) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (gameState.direction !== 'DOWN') {
            setGameState((prev) => ({ ...prev, direction: 'UP' }));
          }
          break;
        case 'ArrowDown':
          if (gameState.direction !== 'UP') {
            setGameState((prev) => ({ ...prev, direction: 'DOWN' }));
          }
          break;
        case 'ArrowLeft':
          if (gameState.direction !== 'RIGHT') {
            setGameState((prev) => ({ ...prev, direction: 'LEFT' }));
          }
          break;
        case 'ArrowRight':
          if (gameState.direction !== 'LEFT') {
            setGameState((prev) => ({ ...prev, direction: 'RIGHT' }));
          }
          break;
        case ' ':
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.direction, gameState.gameOver, gameState.levelComplete]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameState.speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, gameState.speed]);

  const handleRestart = () => {
    const currentLevel = levels.find(l => l.id === Number(levelId));
    setGameState(createInitialState(
      Number(levelId),
      currentLevel?.speed || 200,
      currentLevel?.obstacles || []
    ));
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-8">
      <button
        onClick={() => navigate('/levels')}
        className="mb-8 flex items-center text-white hover:text-indigo-200 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        Back to Levels
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <ScoreMeter
            currentScore={gameState.score}
            highScore={gameState.highScore}
            totalScore={totalScore}
          />
        </div>

        <div className="bg-white rounded-xl p-4 md:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Level {levelId}
            </h1>
            <div className="flex justify-center gap-8 text-lg">
              <p className="text-gray-600">
                Status: {isPaused ? 'Paused' : gameState.gameOver ? 'Game Over' : gameState.levelComplete ? 'Level Complete!' : 'Playing'}
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <GameBoard
              gameState={gameState}
              setGameState={setGameState}
              boardSize={BOARD_SIZE}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Reset Game
            </button>
            {!gameState.gameOver && !gameState.levelComplete && (
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
        </div>
      </div>

      {gameState.levelComplete && nextLevel && (
        <LevelComplete
          score={gameState.score}
          nextLevelId={nextLevel.id}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Game;