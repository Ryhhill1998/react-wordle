import Row from "../row/row.component";
import "./grid.styles.css";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} />
      ))}
    </div>
  );
};

export default Grid;
