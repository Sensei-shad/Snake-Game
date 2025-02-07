import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Levels from './pages/Levels';
import Game from './pages/Game';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/game/:levelId" element={<Game />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;