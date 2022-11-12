import "./welcome.styles.css";

const Welcome = () => {
  const wordleLetters = [
    { letter: "w", colour: "green" },
    { letter: "o", colour: "yellow" },
    { letter: "r", colour: "green" },
    { letter: "d", colour: "grey" },
    { letter: "l", colour: "yellow" },
    { letter: "e", colour: "grey" },
  ];

  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to</h1>
      <div className="row">
        {wordleLetters.map((el, i) => (
          <div key={i}>
            <div className={`space space--front pos-${i}`}>{el.letter}</div>
            <div className={`space space--back pos-${i} ${el.colour}`}>
              {el.letter}
            </div>
          </div>
        ))}
      </div>
      <div className="welcome-buttons-container">
        <button className="welcome-button">Sign in</button>
        <button className="welcome-button">Sign up</button>
      </div>
    </div>
  );
};

export default Welcome;
