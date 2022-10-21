import { useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Feedback from "../feedback/feedback.component";
import Grid from "../grid/grid.component";
import Keyboard from "../keyboard/keyboard.component";

import "./wordle.styles.css";

const Wordle = ({ chosenWord }) => {
  const { currentGuess, guesses, handleKeyUp, guessCorrect, turn, feedback } =
    useWordle(chosenWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="game-container">
      <Feedback value={feedback} turn={turn} guessCorrect={guessCorrect} />
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        guessCorrect={guessCorrect}
      />
      <Keyboard guesses={guesses} handleKeyUp={handleKeyUp} />
    </div>
  );
};

export default Wordle;
