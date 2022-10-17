import './StartScreen.css';
import { FaGithubSquare } from 'react-icons/fa';

function StartScreen({ startGame }) {

    return (
        <>
            <div className="start">
                <h1>
                    Jogo da Palavra Secreta
                </h1>
                <button onClick={startGame}>Iniciar o jogo</button>

            </div>
            <div className="footer">Desenvolvido por Flavio Milani | Feito em ReactJs |
                <a title="Github" href="https://github.com/Flamilani/game-word-secret" target="_blank" rel="noreferrer">
                    <FaGithubSquare />
                </a>
            </div>
        </>
    )
}

export default StartScreen;