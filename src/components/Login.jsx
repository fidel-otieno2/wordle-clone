import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
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