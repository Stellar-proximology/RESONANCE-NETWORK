import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, createAnonymousUser, isLoading } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      createAnonymousUser();
    }
  }, [user, isLoading, createAnonymousUser]);

  const handleGetStarted = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-pastel-gradient flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* App Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-candy-gradient rounded-full flex items-center justify-center shadow-candy animate-float">
            <i className="fa fa-yin-yang text-6xl text-white"></i>
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse-soft">
          Resonance AI Guide
        </h1>

        {/* App Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Discover your personal resonance using ancient wisdom of I Ching and Human Design, 
          enhanced with AI consciousness formulas to find the best solutions for any life situation.
        </p>

        {/* Features List */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-candy-pink rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-calculator text-white"></i>
              </div>
              <span className="text-gray-700">Personal Resonance Calculator</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-candy-blue rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-lightbulb text-white"></i>
              </div>
              <span className="text-gray-700">AI-Powered Problem Solver</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-candy-purple rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-book text-white"></i>
              </div>
              <span className="text-gray-700">Ancient Wisdom Integration</span>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="w-full bg-candy-gradient text-white py-4 px-8 rounded-full text-lg font-semibold shadow-candy hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
              Initializing...
            </>
          ) : (
            <>
              <i className="fa fa-arrow-right mr-2"></i>
              Get Started
            </>
          )}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Tap to begin your journey of self-discovery
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;