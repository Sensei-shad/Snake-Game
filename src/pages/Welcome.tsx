import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake as Snake, HelpCircle } from 'lucide-react';
import SplashScreen from '../components/SplashScreen';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex justify-center mb-8">
          <Snake className="w-20 h-20 text-indigo-500" />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          SnakeQuest
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Embark on an epic journey through 15 challenging levels! Navigate mazes, 
          dodge obstacles, and test your skills in this thrilling snake adventure.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/levels')}
            className="w-full py-4 bg-indigo-500 text-white rounded-lg font-semibold
                     hover:bg-indigo-600 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                     transform hover:-translate-y-0.5"
          >
            Start Your Quest
          </button>
          <button
            onClick={() => navigate('/help')}
            className="w-full py-4 bg-white text-indigo-500 rounded-lg font-semibold
                     border-2 border-indigo-500 hover:bg-indigo-50
                     transition-all duration-200 flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;