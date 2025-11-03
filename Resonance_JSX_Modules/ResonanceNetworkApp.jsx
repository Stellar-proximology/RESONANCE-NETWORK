
// ResonanceNetworkApp.jsx
// Root app structure with intake, visual, and matching modules

import React, { useState } from 'react';
import { IntakeForm } from './components/IntakeForm';
import { OrbitalProfile } from './components/OrbitalProfile';
import { ResonanceMatches } from './components/ResonanceMatches';
import { TimerWindow } from './components/TimerWindow';

export default function ResonanceNetworkApp() {
  const [userProfile, setUserProfile] = useState(null);
  const [resonanceMatches, setResonanceMatches] = useState([]);
  const [timerActive, setTimerActive] = useState(false);

  const handleSubmitProfile = (profileData) => {
    setUserProfile(profileData);
    setTimerActive(true);

    const matches = mockMatchEngine(profileData);
    setResonanceMatches(matches);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">✨ Resonance Network Portal</h1>
        <p className="text-md mt-2 text-indigo-300">Connect through purpose, energy, and timing.</p>
      </header>

      {!userProfile && (
        <IntakeForm onSubmit={handleSubmitProfile} />
      )}

      {userProfile && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrbitalProfile data={userProfile} />
            <div>
              <TimerWindow isActive={timerActive} duration={900} />
              <ResonanceMatches matches={resonanceMatches} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function mockMatchEngine(user) {
  return [
    {
      name: "Kai (Visionary Creator)",
      matchScore: 92,
      role: "Guide",
    },
    {
      name: "Nora (Stabilizer)",
      matchScore: 87,
      role: "Anchor",
    },
  ];
}
