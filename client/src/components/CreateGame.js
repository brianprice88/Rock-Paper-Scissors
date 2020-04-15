import React from 'react';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rounds: 1

    }
    this.createGame = this.createGame.bind(this)
  }

  createGame() {
    const name = this.state.name;
    const rounds = parseInt(this.state.rounds)
    if (name.length === 0 || !name.match(/^[a-zA-Z\-]+$/)) {
      alert("You must enter a valid name!"); return;

    }
    this.props.startplayer1(name, rounds)
  }

  render() {

    return (
      <>
        <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#createModal">
          <strong>Create a new game</strong>
        </button>

        <div className="modal fade" id="createModal">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">How many rounds would you like to play?</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="form-group">
                <select onChange={(e) => this.setState({ rounds: e.target.value })} className="form-control">
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>

              <input onChange={(e) => this.setState({ name: e.target.value })} type='text' placeholder='Enter your name' className='form-control' required />


              <div className="modal-footer">
                <button onClick={this.createGame} type="button" className="btn btn-danger" data-dismiss="modal">Start game!</button>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
}