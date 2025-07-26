import React from 'react';
import Tile from './Tile';
import '../styles/WordleBoard.css';

function WordleBoard({ guesses, currentGuess, solution }) {
  const maxRows = 6;

  // Only add current guess if game is still in progress
  const filledRows = [...guesses];
  if (guesses.length < maxRows) filledRows.push(currentGuess);

  const emptyRows = Array(maxRows - filledRows.length).fill('');
  const rows = [...filledRows, ...emptyRows].slice(0, maxRows); // Always 6 rows

  return (
    <div className="board">
      {rows.map((word, rowIndex) => (
        <div className="board-row" key={rowIndex}>
           {[...Array(5)].map((_, colIndex) => (
            <Tile
              key={colIndex}
              value={word[colIndex] || ''}
              status={getStatus(word, colIndex, solution, rowIndex < guesses.length)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Determining tile color for each letter
function getStatus(word, idx, solution, isSubmitted) {
  if (!isSubmitted || !word) return '';

  word = word.toUpperCase();
  solution = solution.toUpperCase();

  const guessArr = word.split('');
  const solArr = solution.split('');
  const statusArr = Array(5).fill('absent');
  const solUsed = Array(5).fill(false);

  // 1st pass: checking for correct letters
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === solArr[i]) {
      statusArr[i] = 'correct';
      solUsed[i] = true;
    }
  }
  
  // 2nd pass: checking for present letters
  for (let i = 0; i < 5; i++) {
    if (statusArr[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!solUsed[j] && guessArr[i] === solArr[j]) {
        statusArr[i] = 'present';
        solUsed[j] = true;
        break;
      }
    }
  }

  return statusArr[idx];
}

export default WordleBoard;
