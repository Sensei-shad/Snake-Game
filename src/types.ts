export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: string;
  gameOver: boolean;
  score: number;
  level: number;
  speed: number;
  obstacles?: Position[];
  highScore: number;
  levelComplete: boolean;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  requiredScore: number;
  speed: number;
  unlocked: boolean;
  obstacles: Position[];
}

export interface GameProgress {
  totalScore: number;
  highScores: Record<number, number>;
  unlockedLevels: number[];
}