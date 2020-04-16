import React from 'react';
import socketIOClient from "socket.io-client";
import Topbar from './Topbar.js';
import Lobby from './Lobby.js';
import Board from './Board.js';
const socket = socketIOClient("http://192.168.1.6:3001")

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    }
  this.beginGamePlayer1 = this.beginGamePlayer1.bind(this);
  this.beginGamePlayer2 = this.beginGamePlayer2.bind(this);
  }

  beginGamePlayer1(name, rounds) {
    socket.emit('createGame', {name, rounds})
    socket.on('player1', function(data) {
      alert(`Your room number is ${data.room}.  Please notify other player to join this room.`)
      // data.name = player1name
      // data.rounds = gameRounds
      // data.room = room id
    })
    // this.setState({isPlaying: true})
  }

  beginGamePlayer2 (name, room) {
    socket.emit('joinGame', {name, room})
    socket.on('player2', function(data) {
      if (data.message) {
        return;
      }
      else {console.log(data)}
      // if there wasn't an error in joining the room...
    })
    // this.setState({isPlaying: true})
  }




  render() {
    return (
      <>
       <Topbar />  
        {!this.state.isPlaying ? 
        <Lobby 
        startplayer1 = {this.beginGamePlayer1} startplayer2 = {this.beginGamePlayer2}
        />
        : <Board
        />}
      </>

    )
  }
}