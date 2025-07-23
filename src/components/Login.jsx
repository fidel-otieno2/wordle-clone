import React, { useState } from 'react';

<<<<<<< HEAD
 function Login({ onLogin }) {
=======
export default function Login({ onLogin }) {
>>>>>>> 60f6836 (Add Login component logic with state and submit handler)
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
<<<<<<< HEAD
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1.2rem',
    background: '#3a3a3c',
    border: '1px solid #565758',
    borderRadius: '0.3rem',
    color: '#fff',
    boxSizing: 'border-box',
  };

  return (
    <div className="app-container" style={{ maxWidth: 480, margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
      <h1 className="title">Wordle</h1>
      <p style={{ margin: '2rem 0', fontSize: '1.1rem' }}>Enter your name to play</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          style={inputStyle}
          autoFocus
        />
        <button type="submit" className="restart-btn" style={{ marginTop: 32, width: '100%', fontSize: '1.2rem', padding: '0.8em 2em' }}>
          Let's Play
        </button>
      </form>
    </div>
  );
}
export default Login;
=======
  }
>>>>>>> 60f6836 (Add Login component logic with state and submit handler)
