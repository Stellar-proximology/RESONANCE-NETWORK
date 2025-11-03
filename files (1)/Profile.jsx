import React from 'react';

function Profile({ userId }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Profile Component</h2>
      <p>User ID: {userId}</p>
      <p>Coming soon: Full profile management</p>
    </div>
  );
}

export default Profile;
