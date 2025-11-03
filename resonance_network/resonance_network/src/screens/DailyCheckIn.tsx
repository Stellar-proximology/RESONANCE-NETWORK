import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService, DailyLog } from '../services/apiService';

const DailyCheckIn: React.FC = () => {
  const [resonanceScore, setResonanceScore] = useState(2);
  const [moodScore, setMoodScore] = useState(2);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingLog, setExistingLog] = useState<DailyLog | null>(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const availableTags = [
    'clarity', 'friction', 'creativity', 'connection', 'renewal', 
    'transformation', 'balance', 'insight', 'flow', 'resistance',
    'breakthrough', 'harmony', 'challenge', 'growth', 'peace'
  ];

  useEffect(() => {
    checkExistingLog();
  }, [user]);

  const checkExistingLog = async () => {
    if (!user) return;
    
    try {
      const logs = await apiService.getDailyLogs(user.id);
      const today = new Date().toISOString().split('T')[0];
      const todayLog = logs.find(log => log.log_date === today);
      
      if (todayLog) {
        setExistingLog(todayLog);
        setResonanceScore(todayLog.resonance_score);
        setMoodScore(todayLog.mood_score);
        setNote(todayLog.note);
        setSelectedTags(todayLog.selected_tags);
      }
    } catch (error) {
      console.error('Error checking existing log:', error);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');

    try {
      const logData: DailyLog = {
        user_id: user.id,
        log_date: new Date().toISOString().split('T')[0],
        resonance_score: resonanceScore,
        mood_score: moodScore,
        note,
        selected_tags: selectedTags,
      };

      if (existingLog) {
        await apiService.updateDailyLog({ ...logData, id: existingLog.id });
      } else {
        await apiService.createDailyLog(logData);
      }
      
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to save daily log');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-retro-purple';
    if (score >= 3) return 'text-retro-cyan';
    if (score >= 2) return 'text-retro-green';
    if (score >= 1) return 'text-retro-yellow';
    return 'text-retro-red';
  };

  const getScoreLabel = (score: number, type: 'resonance' | 'mood') => {
    const resonanceLabels = ['Disconnected', 'Low', 'Moderate', 'High', 'Peak'];
    const moodLabels = ['Difficult', 'Challenging', 'Neutral', 'Good', 'Excellent'];
    return type === 'resonance' ? resonanceLabels[score] : moodLabels[score];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-green safe-area-top safe-area-bottom">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/home')}
            className="mr-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <i className="fa fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h1 className="text-2xl font-pixel text-white text-shadow-pixel">
              DAILY CHECK-IN
            </h1>
            <p className="text-retro-cyan font-pixel text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        <div className="pixel-card animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resonance Score */}
            <div>
              <label className="block text-retro-cyan font-pixel text-sm mb-3">
                <i className="fa fa-signal mr-2"></i>
                RESONANCE LEVEL: {resonanceScore}
              </label>
              <div className="mb-2">
                <span className={`font-pixel text-lg ${getScoreColor(resonanceScore)}`}>
                  {getScoreLabel(resonanceScore, 'resonance')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={resonanceScore}
                onChange={(e) => setResonanceScore(parseInt(e.target.value))}
                className="pixel-slider w-full"
              />
              <div className="flex justify-between text-white/60 font-pixel text-xs mt-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>

            {/* Mood Score */}
            <div>
              <label className="block text-retro-pink font-pixel text-sm mb-3">
                <i className="fa fa-face-smile mr-2"></i>
                MOOD LEVEL: {moodScore}
              </label>
              <div className="mb-2">
                <span className={`font-pixel text-lg ${getScoreColor(moodScore)}`}>
                  {getScoreLabel(moodScore, 'mood')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={moodScore}
                onChange={(e) => setMoodScore(parseInt(e.target.value))}
                className="pixel-slider w-full"
              />
              <div className="flex justify-between text-white/60 font-pixel text-xs mt-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-retro-yellow font-pixel text-sm mb-2">
                <i className="fa fa-pen mr-2"></i>
                REFLECTION NOTE (OPTIONAL)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full pixel-input h-24 resize-none"
                placeholder="How are you feeling today? Any insights or observations..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-retro-purple font-pixel text-sm mb-3">
                <i className="fa fa-tags mr-2"></i>
                TODAY'S THEMES
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`p-2 border-2 font-pixel text-xs transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-retro-purple/20 border-retro-purple text-retro-purple'
                        : 'border-gray-600 text-white hover:border-retro-purple/50'
                    }`}
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-retro-red/20 border-2 border-retro-red p-3 text-retro-red font-pixel text-sm">
                <i className="fa fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full pixel-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa fa-spinner animate-pixel-spin mr-2"></i>
                  SAVING LOG...
                </>
              ) : (
                <>
                  <i className="fa fa-paper-plane mr-2"></i>
                  {existingLog ? 'UPDATE LOG' : 'SAVE LOG'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Today's Insight */}
        <div className="pixel-card mt-6 animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-lightbulb text-retro-yellow text-xl mr-3"></i>
            <h3 className="font-pixel text-white text-lg">TODAY'S INSIGHT</h3>
          </div>
          
          <div className="bg-retro-yellow/10 border border-retro-yellow p-3">
            <p className="text-retro-yellow font-pixel text-sm">
              Your resonance patterns suggest a day of {resonanceScore >= 3 ? 'high alignment' : 'gentle reflection'}. 
              {moodScore >= 3 ? ' Your positive energy can inspire others in your pods.' : ' Take time for self-care and inner connection.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;