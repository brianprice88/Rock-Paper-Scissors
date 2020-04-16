import React from 'react';
import '../App.css'

var Score = (props) => {
    return (
        <div className="container-fluid scoreboard">
            <div className="row">
                <div className="col-lg-2"> <h1>{props.player1score}</h1></div>
                <div className="col-lg-8" style={{ textAlign: 'center' }}><h1>Best of {props.rounds}</h1> </div>
                <div className="col-lg-2"> <h1>{props.player2score}</h1></div>
            </div>
            <div className="row">
                <div className="col-lg-2">
                    {props.isPlayer1 ? <h1>{props.name}</h1> : <h1>{props.opponent}</h1>}
                </div>
                <div className="col-lg-8" style={{ textAlign: 'center' }}><h1>{props.room} room</h1> </div>
                <div className="col-lg-2">
                    {!props.isPlayer1 ? <h1>{props.name}</h1> : <h1>{props.opponent}</h1>}
                </div>
            </div>
        </div>
    )
}


export default Score