import React from 'react';
import './images/images.css';
import images from './images/images.js'

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
        <nav className="navbar navbar-expand-sm navbar-dark bg-success justify-content-center">
          <h1 className='nav-link disabled'>Rock Paper Scissors</h1>
        </nav>
        <div className="container">
          <div className='row'>
            <div className='col'>
              <button type="button" className="btn btn-primary btn-block">Create new game</button>
            </div>
            <div className='col'>
              <button type="button" className="btn btn-primary btn-block">Join existing game</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <images.leftRock />
          </div>
          <div className='row'>
            <images.rightRock />
          </div>
        </div>
      </>

    )
  }
}

export default App;
