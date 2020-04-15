import React from 'react';

export default class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: 'A'
        }
        this.joinGame = this.joinGame.bind(this)
    }
    joinGame() {
        const name = this.state.name;
        const room = this.state.room
        if (name.length === 0 || !name.match(/^[a-zA-Z\-]+$/)) {
            alert("You must enter a valid name!"); return;
        }
        this.props.startplayer2(name, room)
    }

    render() {
        return (
            <>
                <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#joinModal">
                    <strong>Join an existing game</strong>
                </button>

                <div className="modal fade" id="joinModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">What room would you like to join?</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="form-group">
                                <select onChange={(e) => this.setState({ rounds: e.target.value })} className="form-control">
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='E'>E</option>
                                    <option value='F'>F</option>
                                    <option value='G'>G</option>
                                    <option value='H'>H</option>
                                    <option value='I'>I</option>
                                    <option value='J'>J</option>
                                </select>
                            </div>

                            <input onChange={(e) => this.setState({ name: e.target.value })} type='text' placeholder='Enter your name' className='form-control' required />


                            <div className="modal-footer">
                                <button onClick={this.joinGame} type="button" className="btn btn-danger" data-dismiss="modal">Start game!</button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}