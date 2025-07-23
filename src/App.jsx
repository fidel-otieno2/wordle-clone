import './styles/App.css';
import WordleBoard from './components/WordleBoard';
import Keyboard from './components/Keyboard';
import Landing from './components/Landing';
import Ending from './components/Ending';
import Login from './components/Login';
import { useState, useEffect, useRef } from 'react';
import { WORD_LIST } from './word';

const SOLUTIONS = WORD_LIST.filter(w => w.length === 5);
const getRandomWord = () =>
  SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)].toUpperCase();

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
  const boardRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('wordleUser');
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    if (gameStarted && gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameStatus]);

  useEffect(() => {
    if (!gameStarted) return;
    const handleKeyDown = (e) => {
      if (gameStatus !== 'playing') return;
      if (e.key === 'Enter') onEnter();
      else if (e.key === 'Backspace') onDelete();
      else if (/^[a-zA-Z]$/.test(e.key)) onChar(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, currentGuess, guesses, gameStarted]);

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
    if (gameStatus !== 'playing' || currentGuess.length >= 5) return;
    setCurrentGuess((prev) => (prev + char).slice(0, 5));
    setError('');
  };

  const onDelete = () => {
    if (gameStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
    setError('');
  };

  const onEnter = () => {
    if (gameStatus !== 'playing') return;

    if (currentGuess.length !== 5) {
      setError('Not enough letters');
      return;
    }

    const guessUpper = currentGuess.toUpperCase();

    if (!WORD_LIST.includes(guessUpper)) {
      setError('Not in word list');
      return;
    }

    const newGuesses = [...guesses, guessUpper];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setError('');

    if (guessUpper === solution.toUpperCase()) {
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
    setError('');
    setTimer(0);
  };

  if (!user) return <Login onLogin={onLogin} />;
  if (!gameStarted) return <Landing onStart={() => { setGameStarted(true); setTimer(0); }} />;
  if (gameStatus === 'won' || gameStatus === 'lost') {
    return (
      <Ending
        won={gameStatus === 'won'}
        guesses={guesses}
        time={timer}
        onRestart={onRestart}
        solution={solution}
      />
    );
  }

  return (
    <div className="app-container" ref={boardRef}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title" style={{ border: 'none', margin: 0 }}>Wordle</h1>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', color: '#818384' }}>{user}</div>
          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#b59f3b',
              cursor: 'pointer',
              padding: 0,
              fontSize: '0.9rem'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ fontSize: '1.1rem', margin: '8px 0', color: '#b59f3b' }}>
        Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
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

      {/* Debug: reveal solution */}
      <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
      </div>
    </div>
  );
}

export default App;