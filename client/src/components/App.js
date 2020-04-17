import React from 'react';
import socketIOClient from "socket.io-client";
import Topbar from './static/Topbar.js';
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
      isPlayer1: false,
      toWin: 1,
      player1score: 0,
      player2score: 0,
      opponent: '',
      showOptions: false,
      player1choice: '',
      player2choice: '',
      revealWinner: false,
      displayThumbs: false,
      winner: '',
      gameOver: false
    }
    this.joinRoomPlayer1 = this.joinRoomPlayer1.bind(this);
    this.joinRoomPlayer2 = this.joinRoomPlayer2.bind(this);
    this.player2joined = this.player2joined.bind(this);
    this.displayResult = this.displayResult.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.opponentLeft = this.opponentLeft.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.showError = this.showError.bind(this)
  }

  beginGamePlayer1(name, toWin, room) { // player 1 wants to create a room
    socket.emit('createGame', { name, toWin, room })
  }

  beginGamePlayer2(name, room) { // player 2 wants to join a room
    this.setState({ showOptions: false })
    socket.emit('joinGame', { name, room })
  }

  joinRoomPlayer1(data) { //player 1 creates and joins room
    alert(`Room ${data.room} successfully created.  Please notify other player to join.`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      toWin: data.toWin,
      isPlayer1: true
    })
  }

  joinRoomPlayer2(data) { //player 2 joins room
    alert(`Room ${data.room} entered successfully!  The game is starting.`)
    this.setState({
      isPlaying: true,
      name: data.name,
      room: data.room,
      toWin: data.toWin,
      isPlayer1: false,
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

  showOptions() { //let player pick rock/paper/scissors for this round
    this.setState({ showOptions: true })
  }

  makeSelection(choice) { //hide selection menu and send player's selection to server
    this.setState({ showOptions: false })
    socket.emit('playerChoice', { name: this.state.name, room: this.state.room, choice })
  }

  displayResult(data) { //show round result for a few seconds, then move to next round
    if (data.winner === 'player1') {
      let newScore = this.state.player1score + 1
      let winnerName = this.state.isPlayer1 ? this.state.name : this.state.opponent
      this.setState({
        winner: winnerName,
        revealWinner: true,
        displayThumbs: true,
        player1score: newScore,
        player1choice: data.player1choice,
        player2choice: data.player2choice,
      }, () => setTimeout(this.nextRound, 3000))
    }
    else if (data.winner === 'player2') {
      let newScore = this.state.player2score + 1
      let winnerName = !this.state.isPlayer1 ? this.state.name : this.state.opponent
      this.setState({
        winner: winnerName,
        revealWinner: true,
        displayThumbs: true,
        player2score: newScore,
        player1choice: data.player1choice,
        player2choice: data.player2choice,
      }, () => setTimeout(this.nextRound, 3000))
    } else if (data.winner === 'tie') {
      this.setState({
        winner: 'tie',
        revealWinner: true,
        displayThumbs: true,
        player1choice: data.player1choice,
        player2choice: data.player2choice,
      }, () => setTimeout(this.nextRound, 3000))
    }
  }

  nextRound() {//end game if either player has won, otherwise start next round
    if (this.state.player1score === this.state.toWin) {
      alert('player 2 wins!')
    } else if (this.state.player2score === this.state.toWin) {
      alert('player 2 wins!')
    } else {
      alert('next round starting!')
      this.setState({
        revealWinner: false,
        showOptions: true
      }
      )
    }
  }

  showError(data) { //display any error messages
    alert(data.message)
    return;
  }

  componentDidMount() {

    socket.on('player1', this.joinRoomPlayer1)
    socket.on('player2', this.joinRoomPlayer2)
    socket.on('player2joined', this.player2joined)
    socket.on('startGame', this.showOptions)
    socket.on('showResult', this.displayResult)
    socket.on('playerLeft', this.opponentLeft)
    socket.on('err', this.showError)
  }


  render() {
    return (
      <>
        <Topbar />
        {!this.state.isPlaying ?
          <Lobby
            startplayer1={this.beginGamePlayer1.bind(this)} startplayer2={this.beginGamePlayer2.bind(this)}
          />
          : <Board
            name={this.state.name}
            toWin={this.state.toWin}
            isPlayer1={this.state.isPlayer1}
            player1score={this.state.player1score}
            player2score={this.state.player2score}
            opponent={this.state.opponent}
            showOptions={this.state.showOptions}
            makeSelection={this.makeSelection.bind(this)}
            player1choice={this.state.player1choice}
            player2choice={this.state.player2choice}
            winner={this.state.winner}
            displayResult={this.state.revealWinner}
            showThumbs={this.state.displayThumbs}
          />}
      </>

    )
  }
}