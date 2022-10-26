import { useEffect, useState } from "react";

const useWordle = (chosenWord) => {
  const [turn, setTurn] = useState(0); // keep track of place on gameboard and lives left
  const [currentGuess, setCurrentGuess] = useState(""); // keep track of letters entered by user
  const [guesses, setGuesses] = useState([...Array(6)]); // keep track of all guesses for tile colours
  const [guessCorrect, setGuessCorrect] = useState(false); // set to true when user guesses word
  const [guessSubmitted, setGuessSubmitted] = useState(false); // set to true when user guesses word
  const [guessTooShort, setGuessTooShort] = useState(false); // set to true when user guesses word

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  const saveTurn = () => {
    localStorage.setItem("turn-" + getCurrentDate(), JSON.stringify(turn));
  };

  const getSavedTurn = () => {
    const savedTurn = JSON.parse(
      localStorage.getItem("turn-" + getCurrentDate())
    );
    if (!savedTurn) return;
    setTurn(savedTurn);
  };

  const saveGuesses = () => {
    localStorage.setItem(
      "guesses-" + getCurrentDate(),
      JSON.stringify(guesses)
    );
  };

  const getSavedGuesses = () => {
    const savedGuesses = JSON.parse(
      localStorage.getItem("guesses-" + getCurrentDate())
    );
    if (!savedGuesses) return;
    setGuesses(savedGuesses);
  };

  const saveGuessCorrect = () => {
    localStorage.setItem(
      "guessCorrect-" + getCurrentDate(),
      JSON.stringify(guessCorrect)
    );
  };

  const getSavedGuessCorrect = () => {
    const savedGuessCorrect = JSON.parse(
      localStorage.getItem("guessCorrect-" + getCurrentDate())
    );
    if (!savedGuessCorrect) return;
    setGuessCorrect(savedGuessCorrect);
  };

  useEffect(() => {
    getSavedGuesses();
    getSavedTurn();
    getSavedGuessCorrect();
  }, []);

  useEffect(() => {
    saveGuesses();
    saveTurn();
  }, [guesses, turn]);

  useEffect(() => {
    saveGuessCorrect();
  }, [guessCorrect]);

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
    // check guess is of the current length
    if (currentGuess.length < 5) {
      setGuessTooShort(true);
      return;
    }

    setGuessTooShort(false);

    const chosenLetters = [...chosenWord];

    const guessArray = [...currentGuess].map((character) => ({
      letter: character,
      colour: "grey",
    }));

    checkLetters(guessArray, chosenLetters);

    return guessArray;
  };

  // add the formatted guess array into the array of guesses in the state
  // only called if the user's guess is incorrect
  const addNewGuess = (guessArray) => {
    if (!guessArray) return;

    if (currentGuess === chosenWord) {
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

  const handleLetterSelected = (key, keyCode) => {
    // check if user entered an invalid character or guess is already 5 letters long and return if so
    if (
      keyCode < 65 ||
      keyCode > 90 ||
      currentGuess.length === 5 ||
      key === "Del" ||
      key === "Enter"
    )
      return;

    // add letter pressed to currentGuess
    const keyPressed = key;
    setCurrentGuess(currentGuess + keyPressed);
  };

  const playGame = (key, keyCode = 65) => {
    // check if user pressed enter to submit their guess
    if (key === "Enter") {
      const formatted = formatGuess();
      addNewGuess(formatted);
      setGuessSubmitted(true);
    }

    // check if user pressed backspace
    if (key === "Backspace" || key === "Del") {
      setCurrentGuess((curr) => curr.slice(0, -1));
    }

    handleLetterSelected(key, keyCode);
  };

  // handle what to do for each key the user may have pressed
  const handleKeyUp = ({ key, keyCode }) => {
    playGame(key, keyCode);
  };

  const handleKeyClick = ({ target }) => {
    if (guessCorrect || turn === 6) return;

    playGame(target.innerHTML);
  };

  // return state variables to be used elsewhere in the app
  return {
    turn,
    currentGuess,
    guesses,
    guessCorrect,
    handleKeyUp,
    handleKeyClick,
    guessSubmitted,
    setGuessSubmitted,
    guessTooShort,
  };
};

export default useWordle;
