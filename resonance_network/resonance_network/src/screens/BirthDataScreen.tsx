import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BirthDataScreen: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { updateProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Generate sample natal gates for demo purposes
      const sampleNatalGates = [
        { gate: 24, line: 4, color: 2, tone: 3, base: 5, description: "Gate of Returning" },
        { gate: 61, line: 1, color: 1, tone: 6, base: 2, description: "Gate of Inner Truth" },
        { gate: 13, line: 3, color: 4, tone: 1, base: 3, description: "Gate of The Listener" },
      ];

      await updateProfile({
        birth_date: birthDate,
        birth_time: birthTime,
        birth_location: birthLocation,
        natal_gates: sampleNatalGates,
        current_state: 'neutral',
        challenge: '',
        dream: '',
        skills: [],
        needs: [],
        availability: {},
      });
      
      navigate('/questionnaire');
    } catch (err: any) {
      setError(err.message || 'Failed to save birth data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-green safe-area-top safe-area-bottom">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <i className="fa fa-calendar text-6xl text-retro-yellow mb-4 animate-pixel-pulse"></i>
          <h1 className="text-3xl font-pixel text-white text-shadow-pixel mb-2">
            BIRTH DATA
          </h1>
          <p className="text-white/80 font-pixel text-sm">
            Your cosmic blueprint awaits calculation
          </p>
        </div>

        <div className="pixel-card animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-retro-yellow font-pixel text-sm mb-2">
                <i className="fa fa-calendar mr-2"></i>
                BIRTH DATE
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full pixel-input"
                required
              />
            </div>

            <div>
              <label className="block text-retro-yellow font-pixel text-sm mb-2">
                <i className="fa fa-clock mr-2"></i>
                BIRTH TIME
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full pixel-input"
                required
              />
              <p className="text-white/60 font-pixel text-xs mt-1">
                Exact time enhances accuracy
              </p>
            </div>

            <div>
              <label className="block text-retro-yellow font-pixel text-sm mb-2">
                <i className="fa fa-location-dot mr-2"></i>
                BIRTH LOCATION
              </label>
              <input
                type="text"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                className="w-full pixel-input"
                placeholder="City, State/Country"
                required
              />
              <p className="text-white/60 font-pixel text-xs mt-1">
                City and country for precise coordinates
              </p>
            </div>

            {error && (
              <div className="bg-retro-red/20 border-2 border-retro-red p-3 text-retro-red font-pixel text-sm">
                <i className="fa fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !birthDate || !birthTime || !birthLocation}
              className="w-full pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa fa-spinner animate-pixel-spin mr-2"></i>
                  CALCULATING CHART...
                </>
              ) : (
                <>
                  <i className="fa fa-arrow-right mr-2"></i>
                  CONTINUE
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-white/60 font-pixel text-xs">
            Your birth data is used to calculate your unique resonance pattern
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthDataScreen;