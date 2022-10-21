import "./keyboard-row.styles.css";

const KeyboardRow = ({ letters, guesses, handleKeyUp }) => {
  const findQueryColour = (letter, queryColour) => {
    return guesses.some(
      (guess) =>
        guess &&
        guess.some((el) => el.letter === letter && el.colour === queryColour)
    );
  };

  const findKeyColour = (letter) => {
    const anyGreen = findQueryColour(letter, "green");

    if (anyGreen) return "green";

    const anyYellow = findQueryColour(letter, "yellow");

    if (anyYellow) return "yellow";

    const anyGrey = findQueryColour(letter, "grey");

    if (anyGrey) return "grey";
  };

  return (
    <div className="keyboard-row">
      {letters.map((letter, i) => (
        <div key={i} className={`keyboard-letter ${findKeyColour(letter)}`}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default KeyboardRow;
