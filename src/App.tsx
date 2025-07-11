import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GestureNavigation from './components/GestureNavigation';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'gesture'>('landing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToGesture={() => setCurrentPage('gesture')} />
      ) : (
        <GestureNavigation onNavigateToLanding={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;