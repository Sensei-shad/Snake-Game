import { Level } from '../types';

export const levels: Level[] = [
  { 
    id: 1, 
    name: "Beginner's Path", 
    description: "Take your first steps in snake control",
    requiredScore: 0, 
    speed: 200,
    unlocked: true,
    obstacles: []
  },
  { 
    id: 2, 
    name: "Steady Pace", 
    description: "Build your confidence with basic movements",
    requiredScore: 50, 
    speed: 180,
    unlocked: false,
    obstacles: []
  },
  { 
    id: 3, 
    name: "First Challenge", 
    description: "Navigate around simple obstacles",
    requiredScore: 100, 
    speed: 170,
    unlocked: false,
    obstacles: [
      { x: 5, y: 5 }, { x: 5, y: 6 }
    ]
  },
  { 
    id: 4, 
    name: "Speed Introduction", 
    description: "Experience slightly faster gameplay",
    requiredScore: 150, 
    speed: 160,
    unlocked: false,
    obstacles: [
      { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }
    ]
  },
  { 
    id: 5, 
    name: "Maze Basics", 
    description: "Learn to navigate through corridors",
    requiredScore: 200, 
    speed: 150,
    unlocked: false,
    obstacles: [
      { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
      { x: 12, y: 12 }, { x: 13, y: 12 }
    ]
  },
  { 
    id: 6, 
    name: "Double Trouble", 
    description: "Handle two separate obstacle groups",
    requiredScore: 250, 
    speed: 140,
    unlocked: false,
    obstacles: [
      { x: 5, y: 5 }, { x: 6, y: 5 },
      { x: 15, y: 15 }, { x: 16, y: 15 }
    ]
  },
  { 
    id: 7, 
    name: "Speed Master", 
    description: "Test your reflexes at higher speeds",
    requiredScore: 300, 
    speed: 130,
    unlocked: false,
    obstacles: [
      { x: 8, y: 8 }, { x: 9, y: 8 },
      { x: 8, y: 12 }, { x: 9, y: 12 }
    ]
  },
  { 
    id: 8, 
    name: "Maze Runner", 
    description: "Complex maze navigation challenge",
    requiredScore: 350, 
    speed: 120,
    unlocked: false,
    obstacles: [
      { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
      { x: 12, y: 12 }, { x: 13, y: 12 }, { x: 14, y: 12 },
      { x: 5, y: 15 }, { x: 6, y: 15 }
    ]
  },
  { 
    id: 9, 
    name: "Speed Demon", 
    description: "High-speed precision required",
    requiredScore: 400, 
    speed: 110,
    unlocked: false,
    obstacles: [
      { x: 3, y: 3 }, { x: 3, y: 4 },
      { x: 16, y: 16 }, { x: 16, y: 17 }
    ]
  },
  { 
    id: 10, 
    name: "Labyrinth", 
    description: "Navigate a complex labyrinth at speed",
    requiredScore: 450, 
    speed: 100,
    unlocked: false,
    obstacles: [
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
      { x: 15, y: 13 }, { x: 15, y: 14 }, { x: 15, y: 15 },
      { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 }
    ]
  },
  { 
    id: 11, 
    name: "Expert Challenge", 
    description: "For seasoned snake masters only",
    requiredScore: 500, 
    speed: 90,
    unlocked: false,
    obstacles: [
      { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 },
      { x: 15, y: 12 }, { x: 15, y: 13 }, { x: 15, y: 14 },
      { x: 10, y: 10 }, { x: 11, y: 10 }
    ]
  },
  { 
    id: 12, 
    name: "Speed Master Elite", 
    description: "Lightning-fast reactions needed",
    requiredScore: 550, 
    speed: 80,
    unlocked: false,
    obstacles: [
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 16, y: 14 }, { x: 16, y: 15 }, { x: 16, y: 16 }
    ]
  },
  { 
    id: 13, 
    name: "Grand Master", 
    description: "The ultimate maze challenge",
    requiredScore: 600, 
    speed: 70,
    unlocked: false,
    obstacles: [
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
      { x: 15, y: 13 }, { x: 15, y: 14 }, { x: 15, y: 15 },
      { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 },
      { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 }
    ]
  },
  { 
    id: 14, 
    name: "Speed Demon Elite", 
    description: "Insane speed challenge",
    requiredScore: 650, 
    speed: 60,
    unlocked: false,
    obstacles: [
      { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
      { x: 16, y: 14 }, { x: 16, y: 15 }, { x: 16, y: 16 },
      { x: 10, y: 10 }
    ]
  },
  { 
    id: 15, 
    name: "Legend", 
    description: "Only legends can complete this",
    requiredScore: 700, 
    speed: 50,
    unlocked: false,
    obstacles: [
      { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
      { x: 15, y: 13 }, { x: 15, y: 14 }, { x: 15, y: 15 },
      { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 },
      { x: 8, y: 12 }, { x: 9, y: 12 }, { x: 10, y: 12 },
      { x: 2, y: 17 }, { x: 3, y: 17 }, { x: 4, y: 17 }
    ]
  }
];