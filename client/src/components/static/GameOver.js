import React from 'react'

export default function GameOver(props) {
    return (
        <div className='container-fluid'>
        <div className="pyro">
            <h1 className='winner'>{props.winner} wins the game!</h1>
            <div className='row endgame-btn'>
                <div className='col-sm-3'><button onClick={props.playAgain} type="button" className="btn btn-success btn-lg">Play Again</button></div>
                <div clasName='col-sm-3'><button onClick={props.exitGame} type="button" className="btn btn-success btn-lg">Exit Room</button></div>
            </div>
            <div className="before"></div>
            <div className="after"></div>
        </div>
        </div>
    )
}