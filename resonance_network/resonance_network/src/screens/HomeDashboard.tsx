import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService, GlobalForecast, PersonalForecast, Pod } from '../services/apiService';
import BottomNavigation from '../components/BottomNavigation';

const HomeDashboard: React.FC = () => {
  const [globalForecast, setGlobalForecast] = useState<GlobalForecast | null>(null);
  const [personalForecast, setPersonalForecast] = useState<PersonalForecast | null>(null);
  const [activePods, setActivePods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    loadDashboardData();
    checkTodayLog();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load global forecast
      const globalForecasts = await apiService.getGlobalForecasts();
      const today = new Date().toISOString().split('T')[0];
      const todayGlobal = globalForecasts.find(f => f.forecast_date === today);
      
      if (!todayGlobal) {
        // Create sample global forecast for today
        const sampleGlobal: GlobalForecast = {
          forecast_date: today,
          resonance_index: 3.7,
          text_summary: "Today's cosmic energy supports deep introspection and meaningful connections. The gates are aligned for transformation and renewal.",
          active_gates: ["Gate 24 - Returning", "Gate 61 - Inner Truth", "Gate 13 - The Listener"],
          suggested_tags: ["renewal", "transformation", "clarity", "connection"],
          rule_version: "v1.2.3"
        };
        const createdGlobal = await apiService.createGlobalForecast(sampleGlobal);
        setGlobalForecast(createdGlobal);
      } else {
        setGlobalForecast(todayGlobal);
      }

      // Load personal forecast if user exists
      if (user) {
        const personalForecasts = await apiService.getPersonalForecasts(user.id);
        const todayPersonal = personalForecasts.find(f => f.forecast_date === today);
        
        if (!todayPersonal) {
          // Create sample personal forecast
          const samplePersonal: PersonalForecast = {
            user_id: user.id,
            forecast_date: today,
            text_summary: "Your personal energy today is heightened around Gate 24, inviting you to embrace cycles of renewal and return to your authentic self.",
            active_gates: ["Gate 24 - Returning", "Gate 45 - Gathering Together"],
            transit_effects: "Current transits activate your creative expression and community connections, encouraging new beginnings in collaborative ventures.",
            suggested_tags: ["renewal", "creativity", "community", "authenticity"],
            rule_version: "v1.2.3"
          };
          const createdPersonal = await apiService.createPersonalForecast(samplePersonal);
          setPersonalForecast(createdPersonal);
        } else {
          setPersonalForecast(todayPersonal);
        }

        // Load active pods (sample data for demo)
        const samplePods: Pod[] = [
          {
            id: "sample-pod-1",
            name: "Resonance Builders",
            description: "A pod focused on creative collaboration",
            start_date: "2025-01-01",
            end_date: "2025-02-01",
            status: "active",
            resonance_theme: "Creative Flow",
            cynthia_guidance: "Focus on sharing your unique talents this cycle"
          }
        ];
        setActivePods(samplePods);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkTodayLog = async () => {
    if (!user) return;
    
    try {
      const logs = await apiService.getDailyLogs(user.id);
      const today = new Date().toISOString().split('T')[0];
      const todayLog = logs.find(log => log.log_date === today);
      setHasLoggedToday(!!todayLog);
    } catch (error) {
      console.error('Error checking today log:', error);
    }
  };

  const getResonanceColor = (index: number) => {
    if (index >= 4) return 'text-retro-purple';
    if (index >= 3) return 'text-retro-cyan';
    if (index >= 2) return 'text-retro-green';
    if (index >= 1) return 'text-retro-yellow';
    return 'text-retro-red';
  };

  const getResonanceIcon = (index: number) => {
    if (index >= 4) return 'fa-star';
    if (index >= 3) return 'fa-circle';
    if (index >= 2) return 'fa-square';
    if (index >= 1) return 'fa-triangle';
    return 'fa-minus';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-purple flex items-center justify-center safe-area-top safe-area-bottom">
        <div className="text-center">
          <i className="fa fa-spinner animate-pixel-spin text-4xl text-retro-cyan mb-4"></i>
          <p className="font-pixel text-white">Loading cosmic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-purple safe-area-top safe-area-bottom pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-pixel text-white text-shadow-pixel">
              RESONANCE HUB
            </h1>
            <p className="text-retro-cyan font-pixel text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <i className="fa fa-sign-out-alt text-xl"></i>
          </button>
        </div>

        {/* Global Forecast */}
        {globalForecast && (
          <div className="pixel-card mb-6 animate-slide-up">
            <div className="flex items-center mb-3">
              <i className="fa fa-globe text-retro-cyan text-xl mr-3"></i>
              <h2 className="font-pixel text-white text-lg">GLOBAL RESONANCE</h2>
            </div>
            
            <div className="flex items-center mb-3">
              <i className={`fa ${getResonanceIcon(globalForecast.resonance_index)} ${getResonanceColor(globalForecast.resonance_index)} text-2xl mr-3`}></i>
              <span className={`font-pixel text-xl ${getResonanceColor(globalForecast.resonance_index)}`}>
                {globalForecast.resonance_index.toFixed(1)}
              </span>
            </div>
            
            <p className="text-white/80 font-pixel text-sm mb-3">
              {globalForecast.text_summary}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {globalForecast.suggested_tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-retro-cyan/20 border border-retro-cyan text-retro-cyan font-pixel text-xs"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Personal Forecast */}
        {personalForecast && (
          <div className="pixel-card mb-6 animate-slide-up">
            <div className="flex items-center mb-3">
              <i className="fa fa-user-clock text-retro-pink text-xl mr-3"></i>
              <h2 className="font-pixel text-white text-lg">PERSONAL FORECAST</h2>
              <span className="ml-auto bg-retro-yellow text-pixel-dark px-2 py-1 font-pixel text-xs">
                PREMIUM
              </span>
            </div>
            
            <p className="text-white/80 font-pixel text-sm mb-3">
              {personalForecast.text_summary}
            </p>
            
            <div className="bg-gray-900/50 p-3 border-l-4 border-retro-pink mb-3">
              <p className="text-retro-pink font-pixel text-xs">
                {personalForecast.transit_effects}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {personalForecast.suggested_tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-retro-pink/20 border border-retro-pink text-retro-pink font-pixel text-xs"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Daily Check-in */}
        <div className="pixel-card mb-6 animate-slide-up">
          <button
            onClick={() => navigate('/check-in')}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center">
              <i className={`fa fa-square-check text-2xl mr-4 ${hasLoggedToday ? 'text-retro-green' : 'text-white/40'}`}></i>
              <div className="text-left">
                <h3 className="font-pixel text-white text-lg">DAILY CHECK-IN</h3>
                <p className="font-pixel text-sm text-white/60">
                  {hasLoggedToday ? 'Completed today' : 'Log your resonance'}
                </p>
              </div>
            </div>
            <i className="fa fa-chevron-right text-white/40"></i>
          </button>
        </div>

        {/* Active Pods */}
        {activePods.length > 0 && (
          <div className="pixel-card mb-6 animate-slide-up">
            <div className="flex items-center mb-4">
              <i className="fa fa-users text-retro-green text-xl mr-3"></i>
              <h2 className="font-pixel text-white text-lg">ACTIVE PODS</h2>
            </div>
            
            <div className="space-y-3">
              {activePods.map((pod) => (
                <button
                  key={pod.id}
                  onClick={() => navigate(`/pod/${pod.id}`)}
                  className="w-full p-3 bg-gray-900/50 border border-retro-green/30 hover:border-retro-green transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-pixel text-retro-green text-sm">{pod.name}</h4>
                      <p className="font-pixel text-white/60 text-xs">{pod.resonance_theme}</p>
                    </div>
                    <i className="fa fa-chevron-right text-white/40"></i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cynthia Insights */}
        <div className="pixel-card animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-robot text-retro-purple text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">CYNTHIA'S INSIGHT</h2>
          </div>
          
          <div className="bg-retro-purple/10 border border-retro-purple p-3">
            <p className="text-retro-purple font-pixel text-sm">
              "Your resonance patterns show strong alignment with transformation themes. 
              Consider exploring creative collaborations this cycle - the cosmic timing favors new connections."
            </p>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomeDashboard;