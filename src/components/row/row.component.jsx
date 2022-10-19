import "./row.styles.css";

const Row = ({ guess }) => {
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
