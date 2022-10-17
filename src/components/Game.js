import { useRef, useState } from "react";
import './Game.css';

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        verifyLetter(letter.toUpperCase());
        setLetter("");

        letterInputRef.current.focus();
    }


    return (
        <div className="game">
            <p className="points">
                <span><strong>Pontos:</strong> {score}</span>
            </p>
            <h1>Descubra qual a palavra:</h1>
            <h2 className="tip">
                Dica sobre a palavra: 
                <span> {pickedCategory}</span>
            </h2>
            <p>Você ainda tem {guesses} tentativa(s)</p>
            <div className="wordContainer">
                {
                    letters.map((letter, index) => (
                        guessedLetters.includes(letter) ?
                        (<span key={index} className="letter">{letter}</span>) :
                        (<span key={index} className="blankSquare"></span>) 
                    ))
                }
            </div>

            <div className="letterContainer">
                <p>Tenta descobrir qual letra da palavra:</p>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                        type="text"
                        name="letter"
                        maxLength="1"
                        required
                        onChange={(event) => setLetter(event.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já usadas: </p>
                {
                    wrongLetters.map((letter, index) => (
                        <span key={index}>
                            {letter},
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default Game;