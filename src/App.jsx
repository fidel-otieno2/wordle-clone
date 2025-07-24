import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import WordleBoard from './components/WordleBoard';
import Keyboard from './components/Keyboard';
import Landing from './components/Landing';
import Ending from './components/Ending';
import Login from './components/Login';
import { WORD_LIST } from './word';

const SOLUTIONS = WORD_LIST.filter(w => w.length === 5);
const getRandomWord = () => SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)].toUpperCase();

function App() {
  const [user, setUser] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [solution, setSolution] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('wordleUser');
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    if (gameStarted && gameStatus === 'playing') {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameStatus]);

  useEffect(() => {
    if (!gameStarted || gameStatus !== 'playing') return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') onEnter();
      else if (e.key === 'Backspace') onDelete();
      else if (/^[a-zA-Z]$/.test(e.key)) onChar(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, gameStatus, gameStarted]);

  const onLogin = (username) => {
    localStorage.setItem('wordleUser', username);
    setUser(username);
  };

  const onLogout = () => {
    localStorage.removeItem('wordleUser');
    setUser(null);
    setGameStarted(false);
    onRestart();
  };

  const onChar = (char) => {
    if (currentGuess.length < 5 && gameStatus === 'playing') {
      setCurrentGuess(prev => prev + char);
      setError('');
    }
  };

  const onDelete = () => {
    if (gameStatus === 'playing') {
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  };

  const onEnter = () => {
    if (gameStatus !== 'playing') return;

    if (currentGuess.length !== 5) {
      setError('Not enough letters');
      return;
    }

    const upperGuess = currentGuess.toUpperCase();

    if (!WORD_LIST.includes(upperGuess)) {
      setError('Not in word list');
      return;
    }

    const newGuesses = [...guesses, upperGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setError('');

    if (upperGuess === solution) {
      setGameStatus('won');
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost');
    }
  };

  const onRestart = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setTimer(0);
    setError('');
  };

  // Screens
  if (!user) return <Login onLogin={onLogin} />;
  if (!gameStarted) return <Landing onStart={() => setGameStarted(true)} />;
  if (gameStatus !== 'playing') {
    return (
      <Ending
        won={gameStatus === 'won'}
        guesses={guesses}
        time={timer}
        solution={solution}
        onRestart={onRestart}
      />
    );
  }

  // Main Game UI
  return (
    <div className="app-container">
      <header className="title">Wordle</header>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#b59f3b',
        marginBottom: '0.5rem',
        fontSize: '1rem',
      }}>
        <span>👋 Hello, <strong>{user}</strong></span>
        <span>⏱️ Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
      </div>

      <WordleBoard
        guesses={guesses}
        currentGuess={currentGuess}
        solution={solution}
      />

      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        solution={solution}
      />

      {error && <div className="error">{error}</div>}

      <button
        onClick={onLogout}
        className="restart-btn"
        style={{ marginTop: '1.5rem', background: '#8b0000' }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
