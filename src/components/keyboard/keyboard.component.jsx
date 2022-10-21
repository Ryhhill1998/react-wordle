import KeyboardRow from "../keyboard-row/keyboard-row.component";
import "./keyboard.styles.css";

const Keyboard = ({ guesses, handleKeyUp }) => {
  const rows = [[..."qwertyuiop"], [..."asdfghjkl"], [..."zxcvbnm"]];

  return (
    <div>
      {rows.map((row, i) => (
        <KeyboardRow
          key={i}
          letters={row}
          guesses={guesses}
          handleKeyUp={handleKeyUp}
        />
      ))}
    </div>
  );
};

export default Keyboard;
