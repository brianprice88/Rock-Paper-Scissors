import React from 'react';
import Topbar from './Topbar.js';
import Lobby from './Lobby.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createGame: false,
      joinGame: false,
    }
  }
  render() {
    return (
      <>
       <Topbar />  
        {!this.state.createGame && !this.state.joinGame ? <Lobby />: null}
      </>

    )
  }
}

export default App;
