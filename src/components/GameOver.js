import './GameOver.css';

const GameOver = ({retry, score}) => {
    return (
        <div className="gameOver">
            <h1>Fim de Jogo</h1>
            <p>Seus pontos são: <span>{score}</span></p>
            <button onClick={retry}>Voltar à tela inicial</button>
        </div>
    )  
};

export default GameOver;