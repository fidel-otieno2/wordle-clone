import Tile from './Tile';
import '../styles/WordleBoard.css';

function WordleBoard({ guesses, currentGuess, solution }) {
  const filledRows = [...guesses, currentGuess];
  const emptyRows = Array(6 - filledRows.length).fill('');
  const rows = [...filledRows, ...emptyRows].slice(0, 6); // Always 6 rows

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

// Determines the status of each tile in a guess
function getStatus(word, idx, solution, isSubmitted) {
  if (!isSubmitted) return '';

  word = word.toUpperCase();
  solution = solution.toUpperCase();

  const guessArr = word.split('');
  const solArr = solution.split('');
  const statusArr = Array(5).fill('absent');
  const solUsed = Array(5).fill(false);

  // Pass 1: Mark correct letters
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === solArr[i]) {
      statusArr[i] = 'correct';
      solUsed[i] = true;
    }
  }

  // Pass 2: Mark present letters
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