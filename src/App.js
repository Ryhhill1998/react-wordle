import { useEffect, useState } from "react";

import DATA from "./data/db.json";
import Wordle from "./components/wordle/wordle.component";

import "./App.css";

const App = () => {
  // save chosen word in state
  const [chosenWord, setChosenWord] = useState("");

  const { words } = DATA;

  // randomly select a word from DATA
  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    setChosenWord(generateRandomWord());
  }, []);

  return (
    <div className="App">
      <h1>REACT WORDLE</h1>
      {chosenWord && <Wordle chosenWord={chosenWord} />}
    </div>
  );
};

export default App;
