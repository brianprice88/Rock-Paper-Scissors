import React from 'react'

export default function GameOver(props) {
    return (
        <div className="pyro">
            <h1>{props.winner} wins the game!</h1>
            <div className='row'>
            <div className='col'><button onClick = {props.playAgain} type="button" className="btn btn-danger">Play again</button></div>
            <div clasName='col'><button onClick = {props.exitGame} type="button" className="btn btn-danger">Exit</button></div>
            </div>
            <div className="before"></div>
            <div className="after"></div>
        </div>
    )
}