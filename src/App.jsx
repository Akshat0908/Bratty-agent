import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import BrattyAgentNetwork from './components/BrattyAgentNetwork';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  const handleStartClick = () => {
    setCurrentView('brattyAgentNetwork');
  };

  return (
    <div className="App">
      {currentView === 'landing' && <LandingPage onStartClick={handleStartClick} />}
      {currentView === 'brattyAgentNetwork' && <BrattyAgentNetwork />}
      {currentView === 'brattyAgentNetwork' && (
        <button
          onClick={() => setCurrentView('landing')}
          className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      )}
    </div>
  );
}

export default App;