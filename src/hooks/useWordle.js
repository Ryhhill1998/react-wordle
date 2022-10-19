import { useEffect, useState } from "react";

const useWordle = (chosenWord) => {
  const [turn, setTurn] = useState(0); // keep track of place on gameboard and lives left
  const [currentGuess, setCurrentGuess] = useState(""); // keep track of letters entered by user
  const [guesses, setGuesses] = useState([]); // keep track of all guesses for tile colours
  const [guessCorrect, setGuessCorrect] = useState(false); // set to true when user guesses word

  // assign a colour to each letter in the guess array
  // colour indicates whether guessed letter is correct/partially correct
  const checkLetter = (letter, index) => {
    // check if chosen word contains letter
    if (chosenWord.includes(letter)) {
      // check if letter is in correct place in word
      if (chosenWord[index] === letter) {
        // return green if letter in right place
        return "green";
      }
      // return orange if letter in wrong place
      return "orange";
    }

    // return grey if letter not in word
    return "grey";
  };

  // format the user guess into an array of objects
  // each object contains the letter and its corresponding colour
  const formatGuess = () => {
    // check guess is of the current length
    if (currentGuess.length < 5) {
      console.log("Guess not long enough!");
      return;
    }

    const guessArray = [...currentGuess].map((character, i) => ({
      letter: character,
      colour: checkLetter(character, i),
    }));

    console.log(guessArray);
    if (checkGuessCorrect(guessArray)) {
      console.log("Guess correct");
    } else {
      addNewGuess(guessArray);
    }
  };

  // check whether the user's guess is correct
  // returns true if all letters in guess array have colour green as all in correct place
  const checkGuessCorrect = (guessArray) => {
    let correct = true;

    guessArray.forEach((guess) => {
      // check if any guessed letter does not have the colour green
      if (guess.colour !== "green") {
        // set correct to false as word not correct
        correct = false;
      }
    });

    return correct;
  };

  // add the formatted guess array into the array of guesses in the state
  // only called if the user's guess is incorrect
  const addNewGuess = (guessArray) => {
    setGuesses((prev) => {
      return [...prev, guessArray];
    });
  };

  // handle what to do for each key the user may have pressed
  // function will simply return if key is not a letter/backspace/enter
  const handleKeyUp = ({ key, keyCode }) => {
    // check if user pressed enter to submit their guess
    if (keyCode === 13) {
      formatGuess();
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

  // useEffect just to see changes in currentGuess - to be deleted at end
  useEffect(() => {
    console.log(currentGuess);
  }, [currentGuess]);

  // useEffect just to see changes in guesses - to be deleted at end
  useEffect(() => {
    console.log(guesses);
  }, [guesses]);

  // return state variables to be used elsewhere in the app
  return { turn, currentGuess, guesses, guessCorrect, handleKeyUp };
};

export default useWordle;
