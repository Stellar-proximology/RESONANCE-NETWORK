import React from 'react';
import { useParams } from 'react-router-dom';

function MatchDetail({ userId }) {
  const { otherId } = useParams();
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Match Analysis</h2>
      <p>Your ID: {userId}</p>
      <p>Other ID: {otherId}</p>
      <p>Coming soon: Detailed compatibility breakdown</p>
    </div>
  );
}

export default MatchDetail;
