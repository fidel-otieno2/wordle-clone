import "../styles/Keyboard.css";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
];
function getKeyStatus(guesses, solution) {
  const status = {};

  guesses.forEach((word) => {
    const guessArr = word.split("");
    const solArr = solution.split("");
    const solUsed = Array(5).fill(false);
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === solArr[i]) {
        status[guessArr[i]] = "correct";
        solUsed[i] = true;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (status[guessArr[i]] === "correct") continue;

      for (let j = 0; j < 5; j++) {
        if (!solUsed[j] && guessArr[i] === solArr[j]) {
          if (status[guessArr[i]] !== "correct") {
            status[guessArr[i]] = "present";
          }
          solUsed[j] = true;
          break;
        }
      }

      if (!status[guessArr[i]]) {
        status[guessArr[i]] = "absent";
      }
    }
  });

  return status;
}

function Keyboard({ onChar, onDelete, onEnter, guesses, solution }) {
  const keyStatus = getKeyStatus(guesses, solution);

  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const lowerKey = key.toUpperCase();
            const status = keyStatus[lowerKey] || "";

            const handleClick = () => {
              if (key === "Enter") onEnter();
              else if (key === "Del") onDelete();
              else onChar(key);
            };

            return (
              <button
                key={key}
                className={`key ${status.toLowerCase()}`}
                onClick={handleClick}
                aria-label={`Key ${key}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;