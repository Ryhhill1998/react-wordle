import { useEffect } from "react";
import useWordle from "../../hooks/useWordle";

const Wordle = ({ chosenWord }) => {
  const { currentGuess, handleKeyUp } = useWordle(chosenWord);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>
      <h2>Chosen word: {chosenWord}</h2>
      <p>Current guess: {currentGuess}</p>
    </div>
  );
};

export default Wordle;
