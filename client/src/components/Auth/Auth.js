import React from 'react';

const Auth = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/';
  };

  return (
    <div>
      <h1>Welcome to Fidor Bank</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;