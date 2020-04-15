import React from 'react';
import Topbar from './Topbar.js'
import images from '../images/images.js';
import '../images/images.css';

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
        <div className="container-fluid">
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
            <div className='col'>
              <h1>Rock</h1>
            </div>
            <div className='row'>
              <images.rightRock />
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <images.leftPaper />
            </div>
            <div className='col'>
              <h1>Paper</h1>
            </div>
            <div className='row'>
              <images.rightPaper />
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <images.leftScissors />
            </div>
            <div className='col'>
              <h1>Scissors</h1>
            </div>
            <div className='row'>
              <images.rightScissors />
            </div>
          </div>
      
      </>

    )
  }
}

export default App;
