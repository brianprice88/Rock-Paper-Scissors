import React from 'react';
import socketIOClient from "socket.io-client";
import Topbar from './Topbar.js';
import Lobby from './Lobby.js';
import Board from './Board.js'

const socket = socketIOClient('http://192.168.1.6:3001/');
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
    socket.emit('createGame', {name, rounds})
  }

  beginGamePlayer2 (name, room) {
    this.setState({startGame: true})
    socket.emit('joinGame', {name, room})
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