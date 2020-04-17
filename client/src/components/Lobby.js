import React from 'react';
import CreateGame from './CreateGame.js';
import JoinGame from './JoinGame.js';
import images from '../images/images.js';
import '../images/images.css';
import '../App.css'

export default class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }
    
    componentDidMount() { 
    // this.thumbInterval = setInterval(() => this.setState({ visible: !this.state.visible }), 2000)   
    }

    componentWillUnmount() {
    //  clearInterval(this.thumbInterval)    
    }

    render() {

        return (
            <>
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col'>
                            <CreateGame startplayer1 = {this.props.startplayer1}/>
                        </div>
                        <div className='col'>
                            <JoinGame startplayer2 = {this.props.startplayer2}/>
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