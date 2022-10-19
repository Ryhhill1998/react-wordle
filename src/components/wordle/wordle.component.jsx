import { useEffect } from "react";
import useWordle from "../../hooks/useWordle";
import Grid from "../grid/grid.component";

import "./wordle.styles.css";

const Wordle = ({ chosenWord }) => {
  const { currentGuess, guesses, handleKeyUp, guessCorrect, turn } =
    useWordle(chosenWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div className="container">
      <h2>Chosen word: {chosenWord}</h2>
      <p>Current guess: {currentGuess}</p>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </div>
  );
};

export default Wordle;
