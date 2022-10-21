import { useEffect } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "../grid/grid.component";
import Keyboard from "../keyboard/keyboard.component";

import "./wordle.styles.css";

const Wordle = ({ chosenWord }) => {
  const { currentGuess, guesses, handleKeyUp, guessCorrect, turn } =
    useWordle(chosenWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="game-container">
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keyboard guesses={guesses} handleKeyUp={handleKeyUp} />
    </div>
  );
};

export default Wordle;
