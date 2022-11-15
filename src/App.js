import { useEffect, useState } from "react";

import Wordle from "./components/wordle/wordle.component";

import { getDailyWord } from "./utils/firebase/firebase.utils";

import "./App.css";

const App = () => {
  // save chosen word in state
  const [chosenWord, setChosenWord] = useState("");

  // generated date string
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // load chosen word from database
  const loadDailyWord = async () => {
    const date = getCurrentDate();
    const loadedWord = await getDailyWord(date);
    setChosenWord(loadedWord);
  };

  useEffect(() => {
    loadDailyWord();
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
