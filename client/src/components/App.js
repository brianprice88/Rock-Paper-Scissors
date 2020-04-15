import React from 'react';
import Topbar from './Topbar.js';
import Lobby from './Lobby.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
    }
  }
  render() {
    return (
      <>
       <Topbar />  
        {!this.state.startGame ? <Lobby />: null}
      </>

    )
  }
}