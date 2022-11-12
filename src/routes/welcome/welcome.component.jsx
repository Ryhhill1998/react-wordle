import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const navigateToAuthPage = (event) => {
    const page = event.target.innerHTML;
    if (page === "sign in") {
      navigate("/sign-in");
    }
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to</h1>
      <div id="welcome-row" className="row">
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
        <button className="welcome-button" onClick={navigateToAuthPage}>
          sign in
        </button>
        <button className="welcome-button" onClick={navigateToAuthPage}>
          sign up
        </button>
      </div>
    </div>
  );
};

export default Welcome;
