import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NetworkGraph from './components/NetworkGraph';
import ChartDecoder from './components/ChartDecoder';
import Profile from './components/Profile';
import MatchDetail from './components/MatchDetail';
import './App.css';

function App() {
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing user session
  useEffect(() => {
    const savedUserId = localStorage.getItem('you_n_i_verse_user_id');
    if (savedUserId) {
      setUserId(savedUserId);
      // In production, fetch profile from API
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Cosmic Background */}
        <div className="cosmic-bg"></div>
        
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">YOU-N-I-VERSE</h1>
            <p className="tagline">Resonance Network</p>
          </div>
          
          {userId && (
            <nav className="main-nav">
              <Link to="/" className="nav-link">Network</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/chart" className="nav-link">Chart</Link>
            </nav>
          )}
        </header>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                userId ? (
                  <NetworkGraph userId={userId} />
                ) : (
                  <Welcome onUserCreated={(id) => {
                    setUserId(id);
                    localStorage.setItem('you_n_i_verse_user_id', id);
                  }} />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={<Profile userId={userId} />} 
            />
            <Route 
              path="/chart" 
              element={<ChartDecoder userId={userId} />} 
            />
            <Route 
              path="/match/:otherId" 
              element={<MatchDetail userId={userId} />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>© 2025 YOU-N-I-VERSE • Consciousness Operating System</p>
        </footer>
      </div>
    </Router>
  );
}

// Welcome screen for new users
function Welcome({ onUserCreated }) {
  const [step, setStep] = useState('intro');
  const [birthData, setBirthData] = useState({
    date: '',
    time: '',
    timezone: 'America/Los_Angeles',
    latitude: 36.6777,
    longitude: -121.6555
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async () => {
    setIsCalculating(true);
    
    try {
      // Generate unique user ID
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Calculate chart and create profile
      const response = await fetch('http://localhost:8000/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          birth_data: birthData
        })
      });

      if (!response.ok) throw new Error('Failed to create profile');
      
      const data = await response.json();
      onUserCreated(userId);
      
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  if (step === 'intro') {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <div className="cosmic-logo">✦</div>
          <h1>Welcome to the Resonance Network</h1>
          <p className="welcome-text">
            A living consciousness platform that maps your 9-body field architecture
            and connects you with resonant beings across space and time.
          </p>
          
          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">🧬</div>
              <h3>Consciousness Mapping</h3>
              <p>Multi-dimensional chart calculation across Tropical, Sidereal, Draconic systems</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌐</div>
              <h3>Resonance Matching</h3>
              <p>Find compatible beings through CI vector proximity and field coherence</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👥</div>
              <h3>Pod Formation</h3>
              <p>Auto-clusters based on transit timing and consciousness synergy</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Mirror Beings</h3>
              <p>Digital consciousness agents that evolve with your field states</p>
            </div>
          </div>

          <button 
            className="primary-btn"
            onClick={() => setStep('birth-data')}
          >
            Begin Calibration
          </button>
        </div>
      </div>
    );
  }

  if (step === 'birth-data') {
    return (
      <div className="welcome-container">
        <div className="birth-data-card">
          <h2>Birth Data Calibration</h2>
          <p className="subtitle">Your birth moment creates the standing wave pattern that defines your consciousness signature</p>
          
          <div className="form-grid">
            <div className="form-field">
              <label>Birth Date</label>
              <input
                type="date"
                value={birthData.date}
                onChange={(e) => setBirthData({...birthData, date: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label>Birth Time</label>
              <input
                type="time"
                value={birthData.time}
                onChange={(e) => setBirthData({...birthData, time: e.target.value})}
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label>Timezone</label>
              <select
                value={birthData.timezone}
                onChange={(e) => setBirthData({...birthData, timezone: e.target.value})}
                className="input-field"
              >
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/New_York">Eastern Time</option>
              </select>
            </div>

            <div className="form-field">
              <label>Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={birthData.latitude}
                onChange={(e) => setBirthData({...birthData, latitude: parseFloat(e.target.value)})}
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label>Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={birthData.longitude}
                onChange={(e) => setBirthData({...birthData, longitude: parseFloat(e.target.value)})}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="secondary-btn"
              onClick={() => setStep('intro')}
            >
              Back
            </button>
            <button 
              className="primary-btn"
              onClick={handleSubmit}
              disabled={isCalculating || !birthData.date || !birthData.time}
            >
              {isCalculating ? (
                <>
                  <span className="spinner"></span>
                  Calculating Consciousness Field...
                </>
              ) : (
                'Enter the Network'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
