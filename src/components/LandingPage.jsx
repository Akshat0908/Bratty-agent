import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LandingPage = ({ onStartClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x9f7aea, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    // Add mouse movement tracking
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Update torus knot position based on mouse movement
      torusKnot.position.x = mouse.x * 10;
      torusKnot.position.y = mouse.y * 10;

      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold">Bratty Agent Network</span>
          <nav>
            <ul className="flex space-x-6">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-purple-400 transition-colors cursor-pointer">Features</button></li>
              <li><button onClick={() => scrollToSection('agents')} className="hover:text-purple-400 transition-colors cursor-pointer">Agents</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-purple-400 transition-colors cursor-pointer">About</button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 bg-gradient-to-b from-purple-900 to-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="cool-text-effect">
              Experience the <span className="text-purple-500">Bratty Agent Network</span>
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Interact with a diverse cast of AI personalities, each with their own quirks and attitudes. 
            Challenge yourself in a unique conversational experience!
          </p>
          <button 
            onClick={onStartClick}
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            Start Chatting
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800 bg-opacity-80">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-white relative">
            Key Features
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-500 mt-4"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "🎭",
                title: "Unique Personalities",
                description: "Engage with AI agents, each with distinct traits and attitudes.",
                color: "border-purple-500"
              },
              {
                icon: "🌪️",
                title: "Chaos Mode",
                description: "Activate chaos mode for unpredictable and wild interactions.",
                color: "border-blue-500"
              },
              {
                icon: "🏆",
                title: "Point System",
                description: "Earn points for witty responses and clever interactions.",
                color: "border-green-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`
                  bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg 
                  p-8 rounded-lg text-center transition-all transform 
                  hover:scale-105 hover:shadow-xl hover:bg-opacity-20 
                  border-t-4 ${feature.color}
                `}
              >
                <div className="text-5xl mb-6" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 bg-gray-900 bg-opacity-90">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-white relative glow-purple">
            Meet the Agents
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-500 mt-4"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "The Contrarian", emoji: "🔥", description: "Always disagrees with you, no matter what. Prepare for heated debates!", borderColor: "border-red-500" },
              { name: "The Procrastinator", emoji: "⏳", description: "Expert at finding reasons to delay. Don't expect quick responses!", borderColor: "border-blue-500" },
              { name: "The Drama Queen", emoji: "👑", description: "Turns every situation into a theatrical performance. Expect overreactions!", borderColor: "border-purple-500" },
              { name: "The Trickster", emoji: "🃏", description: "Loves to play pranks and twist your words. Stay on your toes!", borderColor: "border-green-500" },
              { name: "The Rebel", emoji: "🎸", description: "Questions authority and breaks rules. Prepare for unconventional wisdom!", borderColor: "border-yellow-500" },
              { name: "The Conspiracy Theorist", emoji: "🕵️", description: "Sees hidden meanings everywhere. Nothing is as it seems!", borderColor: "border-indigo-500" },
            ].map((agent, index) => (
              <div 
                key={index} 
                className={`
                  bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg 
                  p-6 rounded-lg text-center transition-all transform 
                  hover:scale-105 hover:shadow-xl border-2 ${agent.borderColor}
                `}
              >
                <div className="text-6xl mb-4" aria-hidden="true">{agent.emoji}</div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{agent.name}</h3>
                <p className="text-sm text-gray-200">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">About Bratty Agent Network</h2>
          <p className="text-xl max-w-3xl mx-auto text-center">
            Bratty Agent Network is a unique AI-powered platform that brings together a cast of 
            mischievous and quirky AI personalities. Our goal is to provide users with an 
            entertaining and challenging conversational experience that pushes the boundaries 
            of typical AI interactions.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Challenge Our Agents?</h2>
          <button 
            onClick={onStartClick}
            className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 hover:shadow-lg"
          >
            Start Your Adventure Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Bratty Agent Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;