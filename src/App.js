import { useEffect, useState } from "react";

import Wordle from "./components/wordle/wordle.component";

import { getAllDocumentsFromCollection } from "./utils/firebase/firebase.utils";

import "./App.css";

const App = () => {
  // save chosen word in state
  const [chosenWord, setChosenWord] = useState("");
  const [words, setWords] = useState([]);

  const loadWords = async () => {
    const storedWords = await getAllDocumentsFromCollection("allWords");
    console.log(storedWords);
    setWords(storedWords);
  };

  useEffect(() => {
    loadWords();
  }, []);

  // randomly select a word from DATA
  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    if (!words) return;
    setChosenWord(generateRandomWord());
  }, [words]);

  return (
    <div className="App">
      <h1>REACT WORDLE</h1>
      {chosenWord && <Wordle chosenWord={chosenWord} />}
    </div>
  );
};

export default App;
