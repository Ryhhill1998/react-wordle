import { useEffect, useState } from "react";

import {
  signOutAuthUser,
  getDailyWord,
} from "../../utils/firebase/firebase.utils";

import Wordle from "../../components/wordle/wordle.component";

import "./home.styles.css";

const Home = () => {
  // save chosen word in state
  const [chosenWord, setChosenWord] = useState("");

  // generated date string
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
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

  const signOutUser = () => {
    console.log("Signing out user");
    signOutAuthUser();
  };

  return (
    <div>
      <header>
        <nav>
          <button className="sign-out-btn" onClick={signOutUser}>
            Sign out
          </button>
          <h1 className="game-heading">REACT WORDLE</h1>
          <button className="sign-out-btn" onClick={signOutUser}>
            Sign out
          </button>
        </nav>
      </header>
      <Wordle chosenWord={chosenWord} />
    </div>
  );
};

export default Home;
