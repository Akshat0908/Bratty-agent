import React, { useState, useEffect } from 'react';

const AIVoiceTrainer = () => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Add speech recognition setup here
  }, []);

  const handleMicClick = () => {
    setIsListening(!isListening);
    // Toggle speech recognition
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm">Live clients tracker</span>
          <div className="flex space-x-2">
            <div className="bg-purple-600 px-2 py-1 rounded text-xs">Embark</div>
            <div className="bg-purple-600 px-2 py-1 rounded text-xs">Nexon</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-700 w-8 h-8 rounded-full">32</button>
          <button className="bg-gray-700 w-8 h-8 rounded-full">⚪</button>
          <button className="bg-gray-700 w-8 h-8 rounded-full">•</button>
          <button className="bg-gray-700 w-8 h-8 rounded-full">•</button>
          <button className="bg-gray-700 w-8 h-8 rounded-full">+</button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-purple-500">AI Voice Trainer</span>
          </h1>
          <h2 className="text-2xl text-gray-400">for Any Commercial Product</h2>
        </div>

        <div className="w-full max-w-2xl">
          <div className="bg-purple-900 h-32 rounded-lg mb-4 flex items-center justify-center">
            {/* Update voice visualization */}
            {isListening ? (
              <div className="w-3/4 h-16 bg-purple-700 rounded flex items-center justify-center">
                <span className="animate-pulse">Listening...</span>
              </div>
            ) : (
              <div className="w-3/4 h-16 bg-purple-700 rounded"></div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help you?"
              className="w-full bg-gray-800 text-white border border-purple-500 rounded-lg p-4 pr-12"
            />
            <button 
              onClick={handleMicClick}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                isListening ? 'bg-red-600' : 'bg-purple-600'
              } rounded-full p-2`}
            >
              🎤
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-400">Our clients get more clicks just by using our high scale service</span>
          <a href="#" className="text-purple-500 ml-2">Learn more</a>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-800 px-4 py-2 rounded">Automation</button>
          <button className="bg-gray-800 px-4 py-2 rounded">Sound Devices</button>
          <button className="bg-gray-800 px-4 py-2 rounded">Volume</button>
        </div>
      </footer>
    </div>
  );
};

export default AIVoiceTrainer;