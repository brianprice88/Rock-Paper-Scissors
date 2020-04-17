import React from 'react';
import Score from './Score.js';
import WaitingforOpponent from './static/Waiting';
import images from '../images/images.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {
        return (
            <>
                <Score
                    player1score={this.props.player1score}
                    player2score={this.props.player2score}
                    toWin={this.props.toWin}
                    name={this.props.name}
                    isPlayer1={this.props.isPlayer1}
                    opponent={this.props.opponent}
                />

                {this.props.opponent ? null : <WaitingforOpponent action='join'/>}
                {/* add same thing here but action='select' for when other player hasn't chosen yet */}

                {/* user picks from buttons -> whichever they click should fire function to App which notifies socket, which either tells them other player hasn't selected or figures out who wins/ties */}
                {this.props.showOptions ?
                    <div className="btn-group">
                        <h4>Make your choice:</h4>
                        <button onClick={() => this.props.makeSelection('rock')} type="button" className="btn btn-secondary gameBtn">Rock</button>
                        <button onClick={() => this.props.makeSelection('paper')} type="button" className="btn btn-secondary gameBtn">Paper</button>
                        <button onClick={() => this.props.makeSelection('scissors')} type="button" className="btn btn-secondary gameBtn">Scissors</button>
                    </div>
                    : null
                }

                <div className="container p-3" >
                    <div className='row'>
                        <div className={`col ${this.state.visible ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            {this.props.player1choice === 'rock' ? <images.leftRock /> : null}
                            {this.props.player1choice === 'paper' ? <images.leftPaper /> : null}
                            {this.props.player1choice === 'scissors' ? <images.leftScissors /> : null}
                        </div>
                        <div className='col'>
                            {this.state.visible ? <h1 className='titles'>Paper wins!</h1> : null}
                        </div>
                        <div className={`row ${this.state.visible ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            {this.props.player2choice === 'rock' ? <images.rightRock /> : null}
                            {this.props.player2choice === 'paper' ? <images.rightPaper /> : null}
                            {this.props.player2choice === 'scissors' ? <images.rightScissors /> : null}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}