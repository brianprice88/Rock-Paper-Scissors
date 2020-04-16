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
      isPlayer2: false,
      player1score: 0,
      player2score: 0,
      opponent: '',
      showOptions: false
    }
    this.beginGamePlayer1 = this.beginGamePlayer1.bind(this);
    this.beginGamePlayer2 = this.beginGamePlayer2.bind(this);
    this.joinRoomPlayer1 = this.joinRoomPlayer1.bind(this);
    this.joinRoomPlayer2 = this.joinRoomPlayer2.bind(this);
    this.player2joined = this.player2joined.bind(this);
    this.opponentLeft = this.opponentLeft.bind(this);
    this.showOptions = this.showOptions.bind(this)
  }

  beginGamePlayer1(name, rounds, room) { // player 1 wants to create a room
    socket.emit('createGame', { name, rounds, room })
  }

  beginGamePlayer2(name, room) { // player 2 wants to join a room
    socket.emit('joinGame', { name, room })
  }

  joinRoomPlayer1(data) { //player 1 creates and joins room
    if (data.message) {
      alert(data.message)
      return;
    }
    alert(`Room ${data.room} successfully created.  Please notify other player to join.`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      rounds: data.rounds,
      isPlayer1: true
    })
  }

  joinRoomPlayer2(data) { //player 2 joins room
    if (data.message) {
      alert(data.message)
      return;
    }
    alert(`Room ${data.room} entered successfully!  The game is starting.`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      rounds: data.rounds,
      isPlayer2: true,
      opponent: data.opponent
    })
  }

  player2joined(data) { //player1 is informed that player 2 has joined
    alert(`${data.name} joined the room!`)
    this.setState({
      opponent: data.name,
    })
  }

  opponentLeft() { //player1 finds out player 2 quit
    alert('Your opponent left!')
    this.setState({
      opponent: null,
    })
  }

  showOptions() {
    this.setState({showOptions: true})
  }

  componentDidMount() {

    socket.on('player1', this.joinRoomPlayer1)
    socket.on('player2', this.joinRoomPlayer2)
    socket.on('player2joined', this.player2joined)

    socket.on('startGame', this.showOptions)
    
    socket.on('playerLeft', this.opponentLeft)
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
            player1score={this.state.player1score}
            player2score={this.state.player2score}
            opponent={this.state.opponent}
            makingSelection={this.state.showOptions}
          />}
      </>

    )
  }
}