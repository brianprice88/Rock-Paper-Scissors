import React from 'react';
import Score from './Score.js';
import WaitingforOpponent from './static/Waiting';
import GameOver from './static/GameOver'
import images from '../images/images.js'
import '../images/images.css';

export default function Board(props) {
    return (
        <>
            <Score
                player1score={props.player1score}
                player2score={props.player2score}
                toWin={props.toWin}
                name={props.name}
                isPlayer1={props.isPlayer1}
                opponent={props.opponent}
            />

            {props.opponent ? null : <WaitingforOpponent />}

            {props.showOptions ?
                <div className="btn-group">
                    <h4>Make your choice:</h4>
                    <button onClick={() => props.makeSelection('rock')} type="button" className="btn btn-secondary gameBtn">Rock</button>
                    <button onClick={() => props.makeSelection('paper')} type="button" className="btn btn-secondary gameBtn">Paper</button>
                    <button onClick={() => props.makeSelection('scissors')} type="button" className="btn btn-secondary gameBtn">Scissors</button>
                </div>
                : null
            }

            {props.gameOver ? < GameOver 
            winner={props.winner} 
            playAgain = {props.playAgain}
            exitGame = {props.exitGame}
            /> 
            : null}

            {props.displayResult ?
                <div className="container p-3" >
                    <div className='row'>
                        <div className={`col ${props.showThumbs ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            {props.player1choice === 'rock' ? <images.leftRock /> : null}
                            {props.player1choice === 'paper' ? <images.leftPaper /> : null}
                            {props.player1choice === 'scissors' ? <images.leftScissors /> : null}
                        </div>
                        <div className='col'>
                            {props.winner !== 'tie' ? <h1 className='titles'>{props.winner} wins!</h1> : <h1 className='titles'>Tie!</h1>}
                        </div>
                        <div className={`row ${props.showThumbs ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            {props.player2choice === 'rock' ? <images.rightRock /> : null}
                            {props.player2choice === 'paper' ? <images.rightPaper /> : null}
                            {props.player2choice === 'scissors' ? <images.rightScissors /> : null}
                        </div>
                    </div>
                </div> :
                null
            }
        </>
    )
}