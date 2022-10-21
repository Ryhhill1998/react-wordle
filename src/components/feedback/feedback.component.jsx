import "./feedback.styles.css";

const Feedback = ({ value, turn, guessCorrect }) => {
  if (!value.description) return;

  return (
    <div
      className={`feedback-container ${
        turn === 6 || guessCorrect ? "persist" : ""
      }`}
    >
      {value.description}
    </div>
  );
};

export default Feedback;
