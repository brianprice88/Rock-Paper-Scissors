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
      name: '',
      room: '',
      rounds: 1,
      isPlayer1: false,
      isPlayer2: false
    }
    this.beginGamePlayer1 = this.beginGamePlayer1.bind(this);
    this.beginGamePlayer2 = this.beginGamePlayer2.bind(this);
    this.joinRoomPlayer1 = this.joinRoomPlayer1.bind(this);
    this.joinRoomPlayer2 = this.joinRoomPlayer2.bind(this)
  }

  beginGamePlayer1(name, rounds, room) {
    socket.emit('createGame', { name, rounds, room })
  }

  beginGamePlayer2(name, room) {
    socket.emit('joinGame', { name, room })
  }

  joinRoomPlayer1(data) {
    if (data.message) {
      alert(data.message)
      return;
    }
    alert(`Your room name is ${data.room}.  Please notify other player to join this room.`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      rounds: data.rounds,
      isPlayer1: true
    }, () => console.log(this.state))
  }

  joinRoomPlayer2(data) {
    if (data.message) {
      alert(data.message)
      return;
    }
    alert(`Welcome!  Game will begin shortly`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      rounds: data.rounds,
      isPlayer2: true
    }, () => console.log(this.state))
  }

  componentDidMount() {

    socket.on('player1', this.joinRoomPlayer1)
    socket.on('player2', this.joinRoomPlayer2)

    socket.on('startGame', function (data) {
      console.log(`${data.name} has entered the room!`)
    })
  }


  render() {
    return (
      <>
        <Topbar />
        {!this.state.isPlaying ?
          <Lobby
            startplayer1={this.beginGamePlayer1} startplayer2={this.beginGamePlayer2}
          />
          : <Board
            name={this.state.name}
            room={this.state.room}
            rounds={this.state.rounds}
            isPlayer1={this.state.isPlayer1}
            isPlayer2={this.state.isPlayer2}

          />}
      </>

    )
  }
}