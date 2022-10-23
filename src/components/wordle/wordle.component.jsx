import { useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Feedback from "../feedback/feedback.component";
import Grid from "../grid/grid.component";
import Keyboard from "../keyboard/keyboard.component";

import "./wordle.styles.css";

const Wordle = ({ chosenWord }) => {
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const resetFeeback = () => setShowFeedback(false);

  const {
    currentGuess,
    guesses,
    handleKeyUp,
    handleKeyClick,
    guessCorrect,
    turn,
    guessSubmitted,
    setGuessSubmitted,
    guessTooShort,
  } = useWordle(chosenWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (guessCorrect) {
      setFeedback("You win!");
      setShowFeedback(true);
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (!guessCorrect && turn === 6) {
      setFeedback(`Game over! (${chosenWord})`);
      setShowFeedback(true);
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, guessCorrect, turn, chosenWord]);

  useEffect(() => {
    if (guessSubmitted && guessTooShort) {
      console.log("Not enough letters!");
      setFeedback("Not enough letters!");
      setShowFeedback(true);
      setTimeout(() => {
        resetFeeback();
        setGuessSubmitted(false);
      }, 1000);
    }
  }, [currentGuess, guessSubmitted, setGuessSubmitted, guessTooShort]);

  return (
    <div>
      {showFeedback && <Feedback value={feedback} />}
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        guessCorrect={guessCorrect}
      />
      <Keyboard guesses={guesses} handleKeyClick={handleKeyClick} />
    </div>
  );
};

export default Wordle;
