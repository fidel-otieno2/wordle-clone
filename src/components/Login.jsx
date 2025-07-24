import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div
      className="app-container"
      style={{
        maxWidth: 480,
        margin: '2rem auto',
        padding: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #191970, #0d1a2b)',
        borderRadius: '1rem',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
      }}
    >
      <h1 className="title" style={{ color: '#fff', marginBottom: '1rem' }}>
        Wordle Game
      </h1>

      <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Enter your name to start playing
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Name"
          autoFocus
          style={{
            width: '100%',
            padding: '0.8rem',
            fontSize: '1.1rem',
            background: '#3a3a3c',
            border: '1px solid #565758',
            borderRadius: '0.4rem',
            color: '#fff',
          }}
        />
        <button
          type="submit"
          className="restart-btn"
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.8rem',
            fontSize: '1.1rem',
            background: 'linear-gradient(to right, #32cd32, #228b22)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.4rem',
            cursor: 'pointer',
          }}
        >
          Let's Play
        </button>
      </form>
    </div>
  );
}
