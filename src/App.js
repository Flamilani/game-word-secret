import { useCallback, useEffect, useState } from 'react';
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import { wordList } from './data/words';
import './index.css';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    const pickedWords = words[category];
    const word = pickedWords[Math.floor(Math.random() * pickedWords.length)];

    return { word, category };

  }, [words]);

  const startGame = useCallback(() => {
    clearLettersStates();

    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toUpperCase())

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    console.log(word);

    setGameStage(stages[1].name);

  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toUpperCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) return;

    if (pickedWord.toUpperCase().includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }


  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length <= 0) return;

    if (guessedLetters.length >= uniqueLetters.length) {
      const calcScore = (uniqueLetters.length * 10);

      setScore((actualScore) => actualScore + calcScore);

      startGame();
    }
  }, [guessedLetters, startGame, letters]);

  const retry = () => {
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
