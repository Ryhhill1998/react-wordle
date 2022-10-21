import "./row.styles.css";

const Row = ({ currentGuess, guess, isPrevious, guessCorrect }) => {
  if (currentGuess) {
    return (
      <div className="row">
        {[...currentGuess].map((letter, i) => (
          <div key={i} className="space space--filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - currentGuess.length)].map((_, i) => (
          <div key={i} className="space"></div>
        ))}
      </div>
    );
  }

  if (guess) {
    if (!isPrevious) {
      return (
        <div className="row">
          {guess.map((el, i) => (
            <div key={i} className={`space ${el.colour}`}>
              {el.letter}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="row">
        {guess.map((el, i) => (
          <div key={i}>
            <div className={`space space--front pos-${i}`}>{el.letter}</div>
            <div
              className={`space space--back pos-${i} ${el.colour} ${
                guessCorrect ? "correct" : ""
              }`}
            >
              {el.letter}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="space"></div>
      <div className="space"></div>
      <div className="space"></div>
      <div className="space"></div>
      <div className="space"></div>
    </div>
  );
};

export default Row;
