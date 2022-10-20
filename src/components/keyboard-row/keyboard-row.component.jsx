import "./keyboard-row.styles.css";

const KeyboardRow = ({ letters }) => {
  return (
    <div className="keyboard-row">
      {letters.map((letter, i) => (
        <div className="keyboard-letter" key={i}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default KeyboardRow;
