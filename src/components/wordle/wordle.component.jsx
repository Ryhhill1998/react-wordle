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
      <h2>chosen word: {chosenWord}</h2>
    </div>
  );
};

export default Wordle;
