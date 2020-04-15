import React from 'react';
import Topbar from './Topbar.js';
import Lobby from './Lobby.js';
import Board from './Board.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
    }

  this.beginGamePlayer1 = this.beginGamePlayer1.bind(this);
  this.beginGamePlayer2 = this.beginGamePlayer2.bind(this);
  }

  beginGamePlayer1(name, rounds) {
    this.setState({startGame: true})
  }

  beginGamePlayer2 (name, room) {
    this.setState({startGame: true})
  }

  render() {
    return (
      <>
       <Topbar />  
        {!this.state.startGame ? <Lobby startplayer1 = {this.beginGamePlayer1} startplayer2 = {this.beginGamePlayer2}/>: <Board/>}
      </>

    )
  }
}