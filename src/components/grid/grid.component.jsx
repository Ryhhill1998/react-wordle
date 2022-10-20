import "./grid.styles.css";

import Row from "../row/row.component";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div className="grid-container">
      {guesses.map((guess, i) => (
        <Row
          key={i}
          currentGuess={turn === i ? currentGuess : ""}
          guess={guess}
          isPrevious={true}
        />
      ))}
    </div>
  );
};

export default Grid;
