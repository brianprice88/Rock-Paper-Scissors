import React from 'react';
import Score from './Score.js';
import images from '../images/images.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.makeSelection = this.makeSelection.bind(this)
    }

    makeSelection(choice) {
        this.setState({ visible: true })
    }

    render() {
        return (
            <>
                <Score
                    player1score={this.props.player1score}
                    player2score={this.props.player2score}
                    toWin={this.props.toWin}
                    name={this.props.name}
                    room={this.props.room}
                    isPlayer1={this.props.isPlayer1}
                    opponent={this.props.opponent}
                />

                {this.props.opponent ? null :
                    <div className="alert alert-primary alert-dismissable fade show waiting" role="alert">
                        Waiting for your opponent
    <button className="close" type="button" data-dismiss="alert">
                            <span>&times;</span>
                        </button>
                    </div>
                }


                {/* user picks from buttons -> whichever they click should fire function to App which notifies socket, which either tells them other player hasn't selected or figures out who wins/ties */}
                {this.props.makingSelection ?
                    <div className="btn-group">
                        <h4>Make your choice:</h4>
                        <button onClick={() => this.makeSelection('Rock')} type="button" className="btn btn-secondary gameBtn">Rock</button>
                        <button onClick={() => this.makeSelection('Paper')} type="button" className="btn btn-secondary gameBtn">Paper</button>
                        <button onClick={() => this.makeSelection('Scissors')} type="button" className="btn btn-secondary gameBtn">Scissors</button>
                    </div>
                    : null
                }

                <div className="container p-3" >
                    <div className='row'>
                        <div className={`col ${this.state.visible ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            {this.props.player1choice === 'Rock' ? <images.leftRock /> : null}
                            {this.props.player1choice === 'Paper' ? <images.leftPaper /> : null}
                            {this.props.player1choice === 'Scissors' ? <images.leftScissors /> : null}
                        </div>
                        <div className='col'>
                            <h1 className='titles'>Paper wins!</h1>
                        </div>
                        <div className={`row ${this.state.visible ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            {this.props.player2choice === 'Rock' ? <images.rightRock /> : null}
                            {this.props.player2choice === 'Paper' ? <images.rightPaper /> : null}
                            {this.props.player2choice === 'Scissors' ? <images.rightScissors /> : null}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}