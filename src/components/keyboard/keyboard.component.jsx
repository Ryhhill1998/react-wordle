import KeyboardRow from "../keyboard-row/keyboard-row.component";
import "./keyboard.styles.css";

const Keyboard = ({ guesses, handleKeyClick }) => {
  const rows = [
    [..."qwertyuiop"],
    [..."asdfghjkl"],
    ["Enter", ..."zxcvbnm", "Del"],
  ];

  return (
    <div>
      {rows.map((row, i) => (
        <KeyboardRow
          key={i}
          letters={row}
          guesses={guesses}
          handleKeyClick={handleKeyClick}
        />
      ))}
    </div>
  );
};

export default Keyboard;
