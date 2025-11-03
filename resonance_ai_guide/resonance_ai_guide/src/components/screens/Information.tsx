import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AccordionItem {
  id: string;
  title: string;
  icon: string;
  content: string;
}

const Information: React.FC = () => {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const methodExplanations: AccordionItem[] = [
    {
      id: 'iching',
      title: 'I Ching (Book of Changes)',
      icon: 'fa-yin-yang',
      content: `The I Ching is an ancient Chinese divination text and one of the oldest of the Chinese classics. It uses a system of 64 hexagrams, each composed of six lines that can be either broken (yin) or unbroken (yang).

Key Principles:
• Each hexagram represents a unique life situation or energy pattern
• The interplay of yin and yang forces creates dynamic change
• Provides guidance on timing, relationships, and decision-making
• Offers wisdom on how to align with natural cycles and flow

In our app, we use your birth data and current question to determine which hexagram best represents your current energy signature and the guidance you need.`,
    },
    {
      id: 'human-design',
      title: 'Human Design System',
      icon: 'fa-user',
      content: `Human Design is a modern synthesis system that combines elements from astrology, the I Ching, Kabbalah, and the chakra system. It was developed by Ra Uru Hu in 1987.

Core Components:
• Type: Your energy signature (Manifestor, Generator, Projector, Reflector)
• Strategy: How you best interact with the world
• Authority: Your inner decision-making process
• Profile: Your life theme and role
• Centers: Energy hubs that show your consistent traits and openness

Your Human Design chart, calculated from your birth time and location, reveals your unique energetic blueprint and how you're designed to navigate life most effectively.`,
    },
    {
      id: 'consciousness-formula',
      title: 'Consciousness Formula',
      icon: 'fa-brain',
      content: `Our proprietary consciousness formula integrates multiple wisdom traditions with modern understanding of energy and awareness.

Formula Elements:
• Coherence Level: Alignment between heart, mind, and intuition
• Resonance Frequency: Your natural vibrational state
• Awareness Quotient: Degree of conscious presence
• Flow State Index: Ease of moving with life's currents
• Integration Factor: How well you embody your insights

This formula creates a numerical representation (0-1) of your current consciousness level, helping identify areas for growth and optimal decision-making timing.`,
    },
    {
      id: 'ai-integration',
      title: 'AI Integration & Processing',
      icon: 'fa-robot',
      content: `Our AI system processes your inputs through multiple analytical layers to provide personalized guidance.

Processing Steps:
• Birth data analysis using astronomical calculations
• I Ching hexagram determination based on your energy signature
• Human Design chart generation and interpretation
• Consciousness level calculation using our proprietary formula
• Pattern recognition across all systems
• Personalized guidance synthesis

The AI doesn't replace human intuition but enhances it by providing comprehensive analysis and highlighting patterns you might not notice consciously.`,
    },
  ];

  const usageGuide = `Welcome to the Resonance AI Guide! Here's how to get the most from your experience:

🌟 Getting Started:
• Begin with the Resonance Calculator to understand your baseline energy
• Provide accurate birth date and time for precise calculations
• Ask specific questions for more targeted guidance

💡 Problem Solving:
• Describe your situation in detail
• Select the appropriate context category
• Be open to unexpected perspectives and solutions
• Consider the timing advice provided

📚 Understanding Results:
• Your hexagram represents your current energy pattern
• Human Design profile shows your natural operating style
• Consciousness level indicates your current awareness state
• Recommended actions are suggestions, not commands

🔄 Regular Use:
• Check your resonance during major life transitions
• Use the problem solver for specific challenges
• Revisit guidance as situations evolve
• Trust your intuition alongside the AI insights

Remember: This tool is designed to support your inner wisdom, not replace it. Use the guidance as a starting point for your own reflection and decision-making process.`;

  return (
    <div className="min-h-screen bg-pastel-gradient p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={() => navigate('/menu')}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft mr-4"
          >
            <i className="fa fa-arrow-left text-gray-600"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Information</h1>
            <p className="text-gray-600 text-sm">Learn about our methods and principles</p>
          </div>
        </div>

        {/* Method Explanations Accordion */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-list-alt text-candy-purple mr-2"></i>
            Method Explanations
          </h2>
          
          <div className="space-y-3">
            {methodExplanations.map((item) => (
              <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/40 transition-colors duration-200 min-h-[60px]"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-candy-gradient rounded-full flex items-center justify-center mr-3">
                      <i className={`fa ${item.icon} text-white`}></i>
                    </div>
                    <span className="font-medium text-gray-800">{item.title}</span>
                  </div>
                  <i className={`fa fa-chevron-down text-gray-500 transition-transform duration-200 ${
                    openAccordion === item.id ? 'rotate-180' : ''
                  }`}></i>
                </button>
                
                {openAccordion === item.id && (
                  <div className="px-4 pb-4">
                    <div className="pl-13">
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-user-guide text-candy-blue mr-2"></i>
            Usage Guide
          </h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {usageGuide}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-star text-candy-yellow mr-2"></i>
            Key Principles
          </h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-candy-pink rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <i className="fa fa-heart text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Trust Your Inner Wisdom</h3>
                  <p className="text-gray-600 text-sm">The AI provides insights, but your intuition is the final authority.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-candy-blue rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <i className="fa fa-clock text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Timing Matters</h3>
                  <p className="text-gray-600 text-sm">Consider the timing guidance - sometimes waiting is the best action.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-candy-green rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <i className="fa fa-leaf text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Flow with Change</h3>
                  <p className="text-gray-600 text-sm">Life is constantly changing - use this tool to navigate transitions gracefully.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-candy-purple rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <i className="fa fa-balance-scale text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Seek Balance</h3>
                  <p className="text-gray-600 text-sm">Harmony between opposing forces creates the most sustainable solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <p className="text-sm text-gray-500">
            May your journey be filled with wisdom and resonance ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;