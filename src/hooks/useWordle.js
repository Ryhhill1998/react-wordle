import { useState } from "react";

const useWordle = (chosenWord) => {
  const [turn, setTurn] = useState(0); // keep track of place on gameboard and lives left
  const [currentGuess, setCurrentGuess] = useState(""); // keep track of letters entered by user
  const [guesses, setGuesses] = useState([...Array(6)]); // keep track of all guesses for tile colours
  const [guessCorrect, setGuessCorrect] = useState(false); // set to true when user guesses word

  // assign a colour to each letter in the guess array
  // colour indicates whether guessed letter is correct/partially correct
  const checkLetters = (guessArray, chosenLetters) => {
    // set all letters in correct position to green
    guessArray.forEach((guess, i) => {
      if (chosenLetters[i] === guess.letter) {
        guess.colour = "green";
        chosenLetters[i] = null;
      }
    });

    // set all letters in chosen word but in wrong position to yellow
    guessArray.forEach((guess) => {
      if (chosenLetters.includes(guess.letter) && guess.colour !== "green") {
        guess.colour = "yellow";
        chosenLetters[chosenLetters.indexOf(guess.letter)] = null;
      }
    });
  };

  // format the user guess into an array of objects
  // each object contains the letter and its corresponding colour
  const formatGuess = () => {
    const chosenLetters = [...chosenWord];

    const guessArray = [...currentGuess].map((character, i) => ({
      letter: character,
      colour: "grey",
    }));

    checkLetters(guessArray, chosenLetters);

    return guessArray;
  };

  // add the formatted guess array into the array of guesses in the state
  // only called if the user's guess is incorrect
  const addNewGuess = (guessArray) => {
    if (currentGuess === chosenWord) {
      console.log("Guess correct");
      setGuessCorrect(true);
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[turn] = guessArray;
      return newGuesses;
    });

    // reset current guess
    setCurrentGuess("");

    // increment turn
    setTurn((prevTurn) => prevTurn + 1);
  };

  // handle what to do for each key the user may have pressed
  // function will simply return if key is not a letter/backspace/enter
  const handleKeyUp = ({ key, keyCode }) => {
    // check if user already had maximum turns
    if (guessCorrect || turn === 6) {
      return;
    }

    // check if user pressed enter to submit their guess
    if (keyCode === 13) {
      // check guess is of the current length
      if (currentGuess.length < 5) {
        console.log("Guess not long enough!");
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    // check if user pressed backspace
    if (keyCode === 8) {
      setCurrentGuess((curr) => curr.slice(0, -1));
      return;
    }

    // check if user entered an invalid character or guess is already 5 letters long and return if so
    if (keyCode < 65 || keyCode > 90 || currentGuess.length === 5) return;

    // add letter pressed to currentGuess
    const keyPressed = key;
    setCurrentGuess(currentGuess + keyPressed);
  };

  // return state variables to be used elsewhere in the app
  return { turn, currentGuess, guesses, guessCorrect, handleKeyUp };
};

export default useWordle;
