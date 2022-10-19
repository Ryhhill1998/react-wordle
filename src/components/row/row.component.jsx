import "./row.styles.css";

const Row = ({ currentGuess, guess }) => {
  if (currentGuess) {
    return (
      <div className="row current">
        {[...currentGuess].map((letter, i) => (
          <div key={i} className="space filled">
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
