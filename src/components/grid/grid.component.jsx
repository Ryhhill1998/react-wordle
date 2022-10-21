import "./grid.styles.css";

import Row from "../row/row.component";

const Grid = ({ currentGuess, guesses, turn, guessCorrect }) => {
  return (
    <div className="grid-container">
      {guesses.map((guess, i) => (
        <Row
          key={i}
          currentGuess={turn === i ? currentGuess : ""}
          guess={guess}
          guessCorrect={guessCorrect}
          isPrevious={turn - 1 === i}
        />
      ))}
    </div>
  );
};

export default Grid;
