import React from 'react';
import Score from './static/Score.js';
import Notification from './static/Notification';
import GameOver from './static/GameOver';
import Results from './static/Results';

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

            {props.notification ? <Notification text={props.notificationText} /> : null}

            {props.showOptions ?
                <div className="btn-group">
                    <h4>Make your choice:</h4>
                    <button onClick={() => props.makeSelection('rock')} type="button" className="btn btn-secondary gameBtn">Rock</button>
                    <button onClick={() => props.makeSelection('paper')} type="button" className="btn btn-secondary gameBtn">Paper</button>
                    <button onClick={() => props.makeSelection('scissors')} type="button" className="btn btn-secondary gameBtn">Scissors</button>
                </div>
                : null
            }

            {props.displayResult ?
                <Results
                    player1choice={props.player1choice}
                    player2choice={props.player2choice}
                    winner={props.winner}
                />
                :
                null
            }

            {props.gameOver ?
                < GameOver
                    winner={props.winner}
                    playAgain={props.playAgain}
                    exitGame={props.exitGame}
                />
                :
            <button className="btn btn-warning" onClick={props.exitGame}>Leave game</button>
            }

        </>
    )
}