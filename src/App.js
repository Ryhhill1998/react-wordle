import { useEffect, useState } from "react";

import Wordle from "./components/wordle/wordle.component";

import { getChosenWord } from "./utils/firebase/firebase.utils";

import "./App.css";

const App = () => {
  // save chosen word in state
  const [chosenWord, setChosenWord] = useState("");

  // randomly select a word from DATA
  const generateRandomIndex = () => {
    return Math.floor(Math.random() * 3600);
  };

  // load chosen word from database
  const loadChosenWord = async () => {
    const randomIndex = generateRandomIndex();
    const loadedWord = await getChosenWord("allWords", randomIndex);
    setChosenWord(loadedWord);
  };

  useEffect(() => {
    loadChosenWord();
  }, []);

  useEffect(() => {
    console.log(chosenWord);
  }, [chosenWord]);

  return (
    <div className="App">
      <h1>REACT WORDLE</h1>
      {chosenWord && <Wordle chosenWord={chosenWord} />}
    </div>
  );
};

export default App;
