import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Apple, 
  Trophy,
  Lock,
  Gamepad2,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
  Square
} from 'lucide-react';

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <h2 className="text-xl font-bold text-indigo-600 mb-4">{title}</h2>
    {children}
  </div>
);

const IconExplanation: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-indigo-50 transition-colors">
    <div className="text-indigo-500 flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Help: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center text-white hover:text-indigo-200 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        Back to Welcome
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          How to Play SnakeQuest
        </h1>

        <HelpSection title="Game Controls">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IconExplanation
              icon={<Gamepad2 className="w-6 h-6" />}
              title="Movement"
              description="Use arrow keys or touch/drag to control the snake's direction"
            />
            <div className="flex flex-wrap gap-2 items-center p-4">
              <ArrowUp className="w-6 h-6 text-indigo-500" />
              <ArrowDown className="w-6 h-6 text-indigo-500" />
              <ArrowLeftIcon className="w-6 h-6 text-indigo-500" />
              <ArrowRight className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </HelpSection>

        <HelpSection title="Game Elements">
          <div className="space-y-2">
            <IconExplanation
              icon={<Apple className="w-6 h-6" />}
              title="Food"
              description="Collect apples to grow longer and increase your score"
            />
            <IconExplanation
              icon={<Square className="w-6 h-6" />}
              title="Obstacles"
              description="Avoid hitting walls, obstacles, or your own tail"
            />
          </div>
        </HelpSection>

        <HelpSection title="Level System">
          <div className="space-y-2">
            <IconExplanation
              icon={<Trophy className="w-6 h-6" />}
              title="Scoring"
              description="Each apple collected adds 10 points to your score"
            />
            <IconExplanation
              icon={<Lock className="w-6 h-6" />}
              title="Level Progression"
              description="Reach the required score to unlock the next level"
            />
          </div>
        </HelpSection>

        <HelpSection title="Tips & Tricks">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Plan your route ahead to avoid getting trapped</li>
            <li>Use the space bar to pause the game at any time</li>
            <li>Higher levels introduce more obstacles and faster speeds</li>
            <li>Your progress is automatically saved</li>
          </ul>
        </HelpSection>
      </div>
    </div>
  );
};

export default Help;