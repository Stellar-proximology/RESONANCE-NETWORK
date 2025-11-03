import BrandingBadge from './components/BrandingBadge';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import WelcomeScreen from './components/screens/WelcomeScreen';
import MainMenu from './components/screens/MainMenu';
import ResonanceCalculator from './components/screens/ResonanceCalculator';
import ProblemSolver from './components/screens/ProblemSolver';
import Information from './components/screens/Information';
import ErrorBoundary from './components/ErrorBoundary';

import { analyticsService } from './services/analyticsService';
function App() {
  // Analytics initialization (runs once)
  useEffect(() => {
    try {
      analyticsService.initialize();
      // Optionally track first page view:
      // analyticsService.trackPageView?.(window.location.pathname);
      // console.log('Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-pastel-gradient safe-area-top safe-area-bottom safe-area-left safe-area-right">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/menu" element={<MainMenu />} />
              <Route path="/calculator" element={<ResonanceCalculator />} />
              <Route path="/solver" element={<ProblemSolver />} />
              <Route path="/info" element={<Information />} />
              <Route path="*" element={<WelcomeScreen />} />
            </Routes>
            <BrandingBadge />
</div>
        </Router>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;