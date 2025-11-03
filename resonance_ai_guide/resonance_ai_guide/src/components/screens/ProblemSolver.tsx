import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import CustomDropdown from '../CustomDropdown';
import LoadingSpinner from '../LoadingSpinner';

interface SolutionResult {
  [key: string]: any;
}

const ProblemSolver: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    problemDescription: '',
    context: '',
  });
  const [result, setResult] = useState<SolutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextOptions = [
    { value: 'personal', label: 'Personal Life' },
    { value: 'professional', label: 'Professional/Career' },
    { value: 'spiritual', label: 'Spiritual Growth' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'financial', label: 'Financial' },
    { value: 'creative', label: 'Creative Projects' },
    { value: 'family', label: 'Family Matters' },
    { value: 'education', label: 'Education/Learning' },
    { value: 'other', label: 'Other' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContextChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      context: value,
    }));
  };

  const handleGenerateSolution = async () => {
    if (!formData.problemDescription.trim() || !formData.context) {
      setError('Please describe your problem and select a context');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.solveProblem(
        formData.problemDescription,
        formData.context
      );
      setResult(response);
    } catch (err) {
      setError('Failed to generate solution. Please try again.');
      console.error('Solution generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    // Handle text response
    if (typeof result === 'string') {
      return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-scroll text-candy-green mr-2"></i>
            Your Solution
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      );
    }

    // Handle structured response
    return (
      <div className="space-y-4">
        {/* Main Solution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fa fa-scroll text-candy-green mr-2"></i>
            Solution & Guidance
          </h3>
          
          {/* Render all key-value pairs from the result */}
          {Object.entries(result).map(([key, value]) => {
            if (typeof value === 'string') {
              return (
                <div key={key} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{value}</p>
                </div>
              );
            } else if (Array.isArray(value)) {
              return (
                <div key={key} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </h4>
                  <ul className="space-y-1">
                    {value.map((item, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <i className="fa fa-arrow-right text-candy-blue mr-2 mt-1 text-xs"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            } else if (typeof value === 'object' && value !== null) {
              return (
                <div key={key} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </h4>
                  <div className="pl-4 space-y-2">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey}>
                        <span className="font-medium text-gray-600 capitalize">
                          {subKey.replace(/_/g, ' ')}: 
                        </span>
                        <span className="text-gray-600 ml-2">
                          {Array.isArray(subValue) ? subValue.join(', ') : String(subValue)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
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
            <h1 className="text-2xl font-bold text-gray-800">Problem Solver</h1>
            <p className="text-gray-600 text-sm">AI-powered solutions for life challenges</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Problem Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa fa-edit text-candy-pink mr-2"></i>
              Describe Your Problem
            </label>
            <textarea
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleInputChange}
              placeholder="Please describe your situation in detail. The more specific you are, the better guidance we can provide..."
              rows={6}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-candy-pink/50 focus:border-candy-pink transition-all duration-300 resize-none"
            />
          </div>

          {/* Context Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fa fa-list text-candy-blue mr-2"></i>
              Problem Context
            </label>
            <CustomDropdown
              options={contextOptions}
              value={formData.context}
              onChange={handleContextChange}
              placeholder="Select the area of life this problem relates to"
              icon="fa-list"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-2xl p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Generate Solution Button */}
          <button
            onClick={handleGenerateSolution}
            disabled={isLoading}
            className="w-full bg-candy-gradient text-white py-4 px-6 rounded-full font-semibold shadow-candy hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                Generating Solution...
              </>
            ) : (
              <>
                <i className="fa fa-magic mr-2"></i>
                Generate Solution
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {isLoading && <LoadingSpinner text="Analyzing your problem and generating solutions..." />}
        {result && !isLoading && renderResult()}

        {/* Tips */}
        {!result && !isLoading && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa fa-lightbulb text-candy-yellow mr-2"></i>
              Tips for Better Results
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <i className="fa fa-star text-candy-pink mr-2 mt-1 text-xs"></i>
                <span>Be specific about your situation and what you've already tried</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-star text-candy-pink mr-2 mt-1 text-xs"></i>
                <span>Include relevant background information and context</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-star text-candy-pink mr-2 mt-1 text-xs"></i>
                <span>Mention your goals and what outcome you're hoping for</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolver;