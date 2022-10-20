import "./row.styles.css";

const Row = ({ currentGuess, guess, isPrevious }) => {
  if (currentGuess) {
    return (
      <div className="row current">
        {[...currentGuess].map((letter) => (
          <div className="space filled">{letter}</div>
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
        <div className="row previous">
          {guess.map((el, i) => (
            <div key={i} className={`space ${el.colour}`}>
              {el.letter}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="row previous">
        {guess.map((el, i) => (
          <div key={i} className="space-container">
            <div className={`space front pos-${i}`}>{el.letter}</div>
            <div className={`space back pos-${i} ${el.colour}`}>
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
