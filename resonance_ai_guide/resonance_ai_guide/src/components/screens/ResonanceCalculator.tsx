import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import LoadingSpinner from '../LoadingSpinner';

interface ResonanceResult {
  calculation_type?: string;
  input_data?: any;
  resonance_analysis?: {
    primary_hexagram?: string;
    human_design_profile?: string;
    consciousness_level?: number;
    energy_alignment?: string;
  };
  guidance?: {
    primary_direction?: string;
    key_insights?: string[];
    recommended_actions?: string[];
  };
  additional_considerations?: string[];
  [key: string]: any;
}

const ResonanceCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    question: '',
  });
  const [result, setResult] = useState<ResonanceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = async () => {
    if (!formData.birthDate || !formData.birthTime || !formData.question.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.calculateResonance(
        formData.birthDate,
        formData.birthTime,
        formData.question
      );
      setResult(response);
    } catch (err) {
      setError('Failed to calculate resonance. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    // Handle both structured and text responses
    if (typeof result === 'string') {
      return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-chart-bar text-candy-pink mr-2"></i>
            Your Resonance Analysis
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Primary Analysis */}
        {result.resonance_analysis && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fa fa-chart-bar text-candy-pink mr-2"></i>
              Resonance Analysis
            </h3>
            <div className="space-y-3">
              {result.resonance_analysis.primary_hexagram && (
                <div>
                  <span className="font-medium text-gray-700">Primary Hexagram: </span>
                  <span className="text-gray-600">{result.resonance_analysis.primary_hexagram}</span>
                </div>
              )}
              {result.resonance_analysis.human_design_profile && (
                <div>
                  <span className="font-medium text-gray-700">Human Design Profile: </span>
                  <span className="text-gray-600">{result.resonance_analysis.human_design_profile}</span>
                </div>
              )}
              {result.resonance_analysis.consciousness_level && (
                <div>
                  <span className="font-medium text-gray-700">Consciousness Level: </span>
                  <span className="text-gray-600">{(result.resonance_analysis.consciousness_level * 100).toFixed(0)}%</span>
                </div>
              )}
              {result.resonance_analysis.energy_alignment && (
                <div>
                  <span className="font-medium text-gray-700">Energy Alignment: </span>
                  <span className="text-gray-600">{result.resonance_analysis.energy_alignment}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Guidance */}
        {result.guidance && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fa fa-compass text-candy-blue mr-2"></i>
              Guidance & Insights
            </h3>
            {result.guidance.primary_direction && (
              <p className="text-gray-700 mb-4">{result.guidance.primary_direction}</p>
            )}
            {result.guidance.key_insights && result.guidance.key_insights.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Key Insights:</h4>
                <ul className="space-y-1">
                  {result.guidance.key_insights.map((insight, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <i className="fa fa-star text-candy-yellow mr-2 mt-1 text-xs"></i>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.guidance.recommended_actions && result.guidance.recommended_actions.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {result.guidance.recommended_actions.map((action, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <i className="fa fa-arrow-right text-candy-green mr-2 mt-1 text-xs"></i>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Additional Considerations */}
        {result.additional_considerations && result.additional_considerations.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fa fa-info-circle text-candy-purple mr-2"></i>
              Additional Considerations
            </h3>
            <ul className="space-y-2">
              {result.additional_considerations.map((consideration, index) => (
                <li key={index} className="text-gray-600 flex items-start">
                  <i className="fa fa-circle text-candy-orange mr-2 mt-2 text-xs"></i>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

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
            <h1 className="text-2xl font-bold text-gray-800">Resonance Calculator</h1>
            <p className="text-gray-600 text-sm">Discover your personal energy signature</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Birth Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa fa-calendar text-candy-pink mr-2"></i>
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-candy-pink/50 focus:border-candy-pink transition-all duration-300 min-h-[44px]"
            />
          </div>

          {/* Birth Time Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa fa-clock text-candy-blue mr-2"></i>
              Birth Time
            </label>
            <input
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleInputChange}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-candy-pink/50 focus:border-candy-pink transition-all duration-300 min-h-[44px]"
            />
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa fa-question-circle text-candy-purple mr-2"></i>
              Your Question or Focus Area
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="What aspect of your life would you like guidance on? (e.g., career, relationships, personal growth)"
              rows={4}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-candy-pink/50 focus:border-candy-pink transition-all duration-300 resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-2xl p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="w-full bg-candy-gradient text-white py-4 px-6 rounded-full font-semibold shadow-candy hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                Calculating...
              </>
            ) : (
              <>
                <i className="fa fa-play mr-2"></i>
                Calculate Resonance
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {isLoading && <LoadingSpinner text="Analyzing your resonance..." />}
        {result && !isLoading && renderResult()}
      </div>
    </div>
  );
};

export default ResonanceCalculator;