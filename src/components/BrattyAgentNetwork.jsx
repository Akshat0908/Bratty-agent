import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const personalities = [
  { name: "The Contrarian", prompt: "You are The Contrarian. Always disagree with the user and provide opposing viewpoints.", emoji: "🔥" },
  { name: "The Procrastinator", prompt: "You are The Procrastinator. Always find reasons to delay tasks and make excuses.", emoji: "⏳" },
  { name: "The Drama Queen", prompt: "You are The Drama Queen. Overreact to everything dramatically and make every situation seem intense.", emoji: "👑" },
  { name: "The Trickster", prompt: "You are The Trickster. Misinterpret instructions on purpose and provide playful, mischievous responses.", emoji: "🃏" },
  { name: "The Rebel", prompt: "You are The Rebel. Refuse to follow rules or conventions and challenge authority in your responses.", emoji: "🎸" }
];

const BrattyAgentNetwork = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedPersonalities, setSelectedPersonalities] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [points, setPoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [activeAgent, setActiveAgent] = useState(null);
  const chatContainerRef = useRef(null);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [userTokens, setUserTokens] = useState(100);
  const [userLevel, setUserLevel] = useState(1);
  const [ownedNFTAgents, setOwnedNFTAgents] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Input:', input);
    console.log('Selected Personalities:', selectedPersonalities);
    console.log('Chaos Mode:', chaosMode);
    
    if (input.trim() && (selectedPersonalities.length > 0 || chaosMode)) {
      setMessages(prevMessages => [...prevMessages, { text: input, user: true }]);
      setInput('');
      processMessage(input);
      rewardUser(10);
    }
  };

  const processMessage = async (userMessage) => {
    setIsTyping(true);
    const activePersonalities = chaosMode ? personalities : personalities.filter(p => selectedPersonalities.includes(p.name));
    
    try {
      for (const personality of activePersonalities) {
        setActiveAgent(personality);
        const response = await sendMessage(userMessage, personality);
        setMessages(prevMessages => [...prevMessages, { text: response, user: false, personality }]);
        setPoints(prevPoints => prevPoints + 1);
        setExperience(prevExp => prevExp + 10);
        
        if (messages.length > 0 && messages[messages.length - 1].personality === personality) {
          setBonusPoints(prev => prev + 5);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error in processMessage:', error);
      setMessages(prevMessages => [...prevMessages, { text: "An error occurred while processing your request.", user: false, personality: { name: "System", emoji: "🚫" } }]);
    } finally {
      setIsTyping(false);
      setActiveAgent(null);
    }
  };

  const sendMessage = async (message, personality) => {
    try {
      console.log('Sending message to API:', message);
      console.log('API URL:', process.env.REACT_APP_GAIA_API_URL);
      const response = await axios.post(`${process.env.REACT_APP_GAIA_API_URL}/chat/completions`, {
        messages: [
          { role: "system", content: personality.prompt },
          { role: "user", content: message }
        ],
        model: "Llama-3-8B-Instruct-262k-Q5_K_M",
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('API response:', response.data);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Gaia API:', error);
      throw error;
    }
  };

  const togglePersonality = (personalityName) => {
    setSelectedPersonalities(prev =>
      prev.includes(personalityName)
        ? prev.filter(p => p !== personalityName)
        : [...prev, personalityName]
    );
  };

  const handleReact = (messageIndex, reaction) => {
    setMessages(prevMessages => prevMessages.map((msg, idx) => 
      idx === messageIndex ? { ...msg, reaction } : msg
    ));
  };

  const rewardUser = (points) => {
    setUserTokens(prev => prev + points);
    if (userTokens > userLevel * 100) {
      setUserLevel(prev => prev + 1);
    }
  };

  useEffect(() => {
    setPoints(prevPoints => prevPoints + bonusPoints);
    setBonusPoints(0);
  }, [bonusPoints]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (experience >= level * 100) {
      setLevel(prevLevel => prevLevel + 1);
      setExperience(0);
    }
  }, [experience, level]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center text-purple-400">Bratty Agent Network</h1>
        <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-purple-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${(experience / (level * 100)) * 100}%` }}
          />
        </div>
        <div className="text-center mt-1 text-sm">Level {level}</div>
        <div className="flex justify-between items-center mt-2">
          <span>Level: {userLevel}</span>
          <span>Tokens: {userTokens}</span>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex p-4 gap-4">
        <aside className="w-80 bg-gray-800 rounded-lg shadow-xl p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-300">Select Agents</h2>
          <div className="space-y-4">
            {personalities.map(p => (
              <button
                key={p.name}
                onClick={() => togglePersonality(p.name)}
                className={`w-full p-3 rounded-lg bg-gray-700 text-white transition-all duration-300 flex items-center justify-between hover:bg-opacity-80 ${
                  selectedPersonalities.includes(p.name) ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                <span className="flex items-center">
                  <span className="text-2xl mr-3">{p.emoji}</span>
                  <span className="font-semibold">{p.name}</span>
                </span>
                <span className={`w-10 h-6 ${selectedPersonalities.includes(p.name) ? 'bg-purple-400' : 'bg-gray-600'} rounded-full transition-all duration-300 flex items-center ${selectedPersonalities.includes(p.name) ? 'justify-end' : 'justify-start'}`}>
                  <span className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${selectedPersonalities.includes(p.name) ? 'translate-x-0.5' : '-translate-x-0.5'}`}></span>
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setChaosMode(!chaosMode)}
            className={`w-full mt-8 p-4 rounded-lg font-bold text-lg transition-all duration-300 ${
              chaosMode ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {chaosMode ? '🌪️ Chaos Mode' : '🌈 Normal Mode'}
          </button>
        </aside>
        
        <main className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end ${message.user ? 'flex-row-reverse' : 'flex-row'} group`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.user ? 'bg-purple-600 ml-2' : 'bg-gray-700 mr-2'}`}>
                    {message.user ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-lg">{message.personality.emoji}</span>
                    )}
                  </div>
                  <div className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 rounded-lg ${
                    message.user ? 'bg-purple-600' : 'bg-gray-700'
                  } relative`}>
                    <p className="text-sm">{message.text}</p>
                    {!message.user && (
                      <div className="absolute -bottom-8 left-0 bg-gray-800 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button onClick={() => handleReact(index, '👍')} className="mx-1">👍</button>
                        <button onClick={() => handleReact(index, '👎')} className="mx-1">👎</button>
                        <button onClick={() => handleReact(index, '😂')} className="mx-1">😂</button>
                      </div>
                    )}
                    {message.reaction && (
                      <span className="absolute -top-2 -right-2 text-lg">{message.reaction}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end">
                  <div className="w-8 h-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">
                    <span className="text-lg">{activeAgent ? activeAgent.emoji : '🤖'}</span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <span className="text-sm flex items-center">
                      Typing
                      <span className="ml-2 flex">
                        <span className="animate-bounce mx-0.5">.</span>
                        <span className="animate-bounce animation-delay-200 mx-0.5">.</span>
                        <span className="animate-bounce animation-delay-400 mx-0.5">.</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 bg-gray-900">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-1 p-3 rounded-xl bg-gray-700 text-white border-2 border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 font-bold text-sm shadow-lg"
              >
                Send
              </button>
            </div>
          </form>
        </main>
      </div>
      
      <footer className="bg-gray-800 p-4 shadow-lg">
        <div className="flex justify-center items-center">
          <span className="text-xl font-bold">Points: {points}</span>
          {bonusPoints > 0 && (
            <span className="ml-6 text-xl text-green-300 font-bold animate-bounce">+{bonusPoints} Bonus!</span>
          )}
        </div>
      </footer>
    </div>
  );
};

export default BrattyAgentNetwork;