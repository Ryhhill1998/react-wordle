import KeyboardRow from "../keyboard-row/keyboard-row.component";
import "./keyboard.styles.css";

const Keyboard = () => {
  const rows = [[..."qwertyuiop"], [..."asdfghjkl"], [..."zxcvbnm"]];

  return (
    <div>
      {rows.map((row, i) => (
        <KeyboardRow key={i} letters={row} />
      ))}
    </div>
  );
};

export default Keyboard;
