import React from 'react';
import Score from './Score.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <>
                <Score
                    player1score={this.props.player1score}
                    player2score={this.props.player2score}
                    rounds={this.props.rounds}
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

            </>





        )
    }
}