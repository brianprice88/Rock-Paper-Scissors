import React from 'react';
import images from '../images/images.js';
import '../images/images.css';
import '../App.css'

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        setInterval(() => this.setState({ visible: !this.state.visible }), 2000)
    }

    render() {

        return (
            <>

                <div className="container-fluid">
                    <div className='row'>
                        <div className='col'>
                            <button type="button" className="btn btn-primary btn-block"><strong>Create new game</strong></button>
                        </div>
                        <div className='col'>
                            <button type="button" className="btn btn-primary btn-block"><strong>Join existing game</strong></button>
                        </div>
                    </div>
                </div>


                <div className="container p-3" >
                    <div className='row'>
                        <div className={`col ${this.state.visible ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            <images.leftRock />
                        </div>
                        <div className='col'>
                            <h1 className='titles'>Rock</h1>
                        </div>
                        <div className={`row ${this.state.visible ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            <images.rightRock />
                        </div>
                    </div>

                    <div className='row'>
                        <div className={`col ${this.state.visible ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            <images.leftPaper />
                        </div>
                        <div className='col'>
                            <h1 className='titles'>Paper</h1>
                        </div>
                        <div className={`row ${this.state.visible ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            <images.rightPaper />
                        </div>
                    </div>

                    <div className='row'>
                        <div className={`col ${this.state.visible ? "lefthandlobby" : "lefthandlobbyinvisible"}`}>
                            <images.leftScissors />
                        </div>
                        <div className='col'>
                            <h1 className='titles'>Scissors</h1>
                        </div>
                        <div className={`row ${this.state.visible ? "righthandlobby" : "righthandlobbyinvisible"}`}>
                            <images.rightScissors />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Lobby