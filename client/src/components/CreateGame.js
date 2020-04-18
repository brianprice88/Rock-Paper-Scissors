import React from 'react';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      toWin: 1,
      room: ''

    }
    this.createGame = this.createGame.bind(this);
    this.addText = this.addText.bind(this);
  }

  addText(property, value) {
    if (value.match(/^[a-zA-Z]+$/)) {
      this.setState({
        [property]: value
      })
    }
  }

  createGame() {
    const name = this.state.name;
    const toWin = parseInt(this.state.toWin);
    const room = this.state.room;
    if (name.length > 0 && room.length > 0) {
      this.props.startplayer1(name, toWin, room)
    }
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
                <h4 className="modal-title">How many points would you like to play to?</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="form-group">
                <select onChange={(e) => this.setState({ toWin: e.target.value })} className="form-control">
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

              <input onChange={(e) => this.addText('room', e.target.value)} type='text' placeholder='Enter a name for your room' className='form-control' required />

              <input onChange={(e) => this.addText('name', e.target.value)} type='text' placeholder='Enter your name' className='form-control' required />


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