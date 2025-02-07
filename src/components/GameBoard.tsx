import React, { useEffect, useCallback, useRef, useState } from 'react';
import { GameState, Position } from '../types';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  boardSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, setGameState, boardSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastMoveRef = useRef<number>(0);
  const moveQueueRef = useRef<string[]>([]);
  const requestRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateNewDirection = useCallback((targetX: number, targetY: number) => {
    const head = gameState.snake[0];
    const canvas = canvasRef.current;
    if (!canvas) return gameState.direction;

    const cellSize = canvas.width / boardSize;
    
    const gridX = Math.floor(targetX / cellSize);
    const gridY = Math.floor(targetY / cellSize);
    
    const deltaX = gridX - head.x;
    const deltaY = gridY - head.y;

    // Improved direction calculation
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'RIGHT' : 'LEFT';
    } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return deltaY > 0 ? 'DOWN' : 'UP';
    }
    
    return gameState.direction;
  }, [gameState.snake, boardSize]);

  const handleMove = useCallback((targetX: number, targetY: number) => {
    if (gameState.gameOver || gameState.levelComplete) return;

    const now = Date.now();
    if (now - lastMoveRef.current < 30) return; // Even more responsive controls
    lastMoveRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = targetX - rect.left;
    const y = targetY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    const newDirection = calculateNewDirection(canvasX, canvasY);
    
    // Immediate direction change if queue is empty
    if (moveQueueRef.current.length === 0) {
      setGameState(prev => ({ ...prev, direction: newDirection }));
    } else if (newDirection !== moveQueueRef.current[moveQueueRef.current.length - 1]) {
      moveQueueRef.current.push(newDirection);
    }
  }, [gameState.gameOver, gameState.levelComplete, calculateNewDirection, setGameState]);

  // Process the move queue using requestAnimationFrame
  const processQueue = useCallback(() => {
    if (moveQueueRef.current.length > 0) {
      const nextMove = moveQueueRef.current[0];
      setGameState(prev => ({ ...prev, direction: nextMove }));
      moveQueueRef.current.shift();
    }
    requestRef.current = requestAnimationFrame(processQueue);
  }, [setGameState]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(processQueue);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [processQueue]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
      handleMove(touch.clientX, touch.clientY);
    }
  }, [handleMove]);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
      handleMove(touch.clientX, touch.clientY);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.buttons === 1) { // Only handle when primary mouse button is pressed
      handleMove(event.clientX, event.clientY);
    }
  }, [handleMove]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / boardSize;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid for better visibility
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    // Draw obstacles if they exist
    if (gameState.obstacles) {
      ctx.fillStyle = '#6b7280';
      gameState.obstacles.forEach(obstacle => {
        ctx.fillRect(
          obstacle.x * cellSize,
          obstacle.y * cellSize,
          cellSize - 2,
          cellSize - 2
        );
      });
    }

    // Draw food with improved graphics
    const foodX = gameState.food.x * cellSize;
    const foodY = gameState.food.y * cellSize;
    
    // Draw main apple body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      foodX + cellSize / 2,
      foodY + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw apple stem
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(
      foodX + cellSize / 2 - 2,
      foodY + 2,
      4,
      cellSize / 4
    );

    // Add shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
      foodX + cellSize / 3,
      foodY + cellSize / 3,
      cellSize / 6,
      cellSize / 6,
      Math.PI / 4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake with improved graphics
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (index === 0) {
        // Draw head
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize - 2, cellSize - 2, 8);
        ctx.fill();

        // Draw eyes
        ctx.fillStyle = '#000000';
        const eyeSize = cellSize / 8;
        const eyeOffset = cellSize / 4;
        
        // Position eyes based on direction
        let leftEyeX = x + eyeOffset;
        let leftEyeY = y + eyeOffset;
        let rightEyeX = x + cellSize - eyeOffset - eyeSize;
        let rightEyeY = y + eyeOffset;

        switch (gameState.direction) {
          case 'UP':
            leftEyeX = x + eyeOffset;
            rightEyeX = x + cellSize - eyeOffset - eyeSize;
            leftEyeY = rightEyeY = y + eyeOffset;
            break;
          case 'DOWN':
            leftEyeX = x + eyeOffset;
            rightEyeX = x + cellSize - eyeOffset - eyeSize;
            leftEyeY = rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
          case 'LEFT':
            leftEyeX = rightEyeX = x + eyeOffset;
            leftEyeY = y + eyeOffset;
            rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
          case 'RIGHT':
            leftEyeX = rightEyeX = x + cellSize - eyeOffset - eyeSize;
            leftEyeY = y + eyeOffset;
            rightEyeY = y + cellSize - eyeOffset - eyeSize;
            break;
        }

        ctx.fillRect(leftEyeX, leftEyeY, eyeSize, eyeSize);
        ctx.fillRect(rightEyeX, rightEyeY, eyeSize, eyeSize);
      } else {
        // Draw body segments with gradient
        const gradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
        gradient.addColorStop(0, '#22c55e');
        gradient.addColorStop(1, '#16a34a');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize - 2, cellSize - 2, 4);
        ctx.fill();

        // Add scale pattern
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.ellipse(
          x + cellSize / 2,
          y + cellSize / 2,
          cellSize / 6,
          cellSize / 6,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  }, [gameState, boardSize]);

  useEffect(() => {
    drawGame();
  }, [gameState, drawGame]);

  return (
    <canvas
      ref={canvasRef}
      width={isMobile ? 320 : 400}
      height={isMobile ? 320 : 400}
      onMouseDown={(e) => {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={(e) => e.preventDefault()}
      className="border-4 border-indigo-500 rounded-lg bg-indigo-50 cursor-pointer touch-none select-none max-w-full"
    />
  );
};

export default GameBoard;