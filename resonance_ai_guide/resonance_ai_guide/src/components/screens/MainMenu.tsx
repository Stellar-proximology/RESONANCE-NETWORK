import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 3,
      title: 'Resonance Calculator',
      description: 'Calculate your personal resonance using I Ching and Human Design',
      icon: 'fa-calculator',
      color: 'candy-pink',
      route: '/calculator',
    },
    {
      id: 4,
      title: 'Problem Solver',
      description: 'Get AI-powered solutions for any life challenge',
      icon: 'fa-lightbulb',
      color: 'candy-blue',
      route: '/solver',
    },
    {
      id: 5,
      title: 'Information',
      description: 'Learn about the methods and principles we use',
      icon: 'fa-info-circle',
      color: 'candy-purple',
      route: '/info',
    },
  ];

  return (
    <div className="min-h-screen bg-pastel-gradient p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 mx-auto bg-candy-gradient rounded-full flex items-center justify-center shadow-candy mb-4 animate-float">
            <i className="fa fa-compass text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Main Menu</h1>
          <p className="text-gray-600">Choose your path to enlightenment</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft hover:shadow-candy transition-all duration-300 transform hover:scale-105 text-left min-h-[80px]"
            >
              <div className="flex items-center">
                <div className={`w-16 h-16 bg-${item.color} rounded-2xl flex items-center justify-center mr-4 flex-shrink-0`}>
                  <i className={`fa ${item.icon} text-2xl text-white`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                <i className="fa fa-chevron-right text-gray-400 ml-2"></i>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-sm text-gray-500">
            Tap any option to explore your resonance journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;