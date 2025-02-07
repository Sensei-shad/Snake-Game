import React, { useEffect, useState } from 'react';
import { Cake as Snake } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center z-50">
      <div className="text-center">
        {isMobile ? (
          // Mobile splash screen
          <div className="animate-fade-in">
            <Snake className="w-16 h-16 text-white mb-4 mx-auto animate-pulse" />
            <h1 className="text-2xl font-bold text-white">SnakeQuest</h1>
          </div>
        ) : (
          // Desktop splash screen
          <div className="animate-fade-in">
            <Snake className="w-24 h-24 text-white mb-6 mx-auto animate-pulse" />
            <h1 className="text-4xl font-bold text-white mb-2">SnakeQuest</h1>
            <p className="text-indigo-200">Master the maze, become the legend</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen