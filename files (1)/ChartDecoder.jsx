import React from 'react';

function ChartDecoder({ userId }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Chart Decoder</h2>
      <p>User ID: {userId}</p>
      <p>Coming soon: Multi-system chart visualization</p>
    </div>
  );
}

export default ChartDecoder;
