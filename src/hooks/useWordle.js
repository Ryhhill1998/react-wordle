import { useEffect, useState } from "react";

const useWordle = (chosenWord) => {
  const [turn, setTurn] = useState(0); // keep track of place on gameboard and lives left
  const [currentGuess, setCurrentGuess] = useState(""); // keep track of letters entered by user
  const [guesses, setGuesses] = useState([]); // keep track of all guesses for tile colours
  const [guessCorrect, setGuessCorrect] = useState(false); // set to true when user guesses word

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

  const formatGuess = () => {
    // check guess is of the current length
    if (currentGuess.length < 5) {
      console.log("Guess not long enough!");
      return;
    }

    const guessArray = currentGuess.split("").map((character, i) => ({
      letter: character,
      colour: checkLetter(character, i),
    }));

    console.log(guessArray);
    const guessIsCorrect = checkGuessCorrect(guessArray);
    console.log("Guess correct? " + guessIsCorrect);
  };

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

  const addNewGuess = () => {};

  const handleKeyUp = (event) => {
    // check if user pressed enter to submit their guess
    if (event.keyCode === 13) {
      formatGuess();
    }

    // check if user pressed backspace
    if (event.keyCode === 8) {
      setCurrentGuess((curr) => curr.slice(0, curr.length - 1));
      return;
    }

    // check if user entered an invalid character or guess is already 5 letters long and return if so
    if (event.keyCode < 65 || event.keyCode > 90 || currentGuess.length === 5)
      return;

    // add letter pressed to currentGuess
    const keyPressed = event.key;
    setCurrentGuess(currentGuess + keyPressed);
  };

  // useEffect just to see changes in currentGuess
  useEffect(() => {
    console.log(currentGuess);
  }, [currentGuess]);

  return { turn, currentGuess, guesses, guessCorrect, handleKeyUp };
};

export default useWordle;
