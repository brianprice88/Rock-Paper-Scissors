import React from 'react';
import Score from './static/Score.js';
import Picker from './static/Picker.js'
import Notification from './static/Notification';
import GameOver from './static/GameOver';
import Results from './static/Results';

export default function Board(props) {
    return (
        <div className='container-fluid'>
            <Score
                player1score={props.player1score}
                player2score={props.player2score}
                toWin={props.toWin}
                name={props.name}
                isPlayer1={props.isPlayer1}
                opponent={props.opponent}
                exitGame={props.exitGame}
            />

            {props.notification ?
                <Notification
                    text={props.notificationText} />
                : null}

            {props.showOptions ?
                <Picker
                    makeSelection={props.makeSelection} />
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
                null
            }

        </div>
    )
}