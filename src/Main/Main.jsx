import React, { Component } from 'react';
import './Main.css';
import SidePannel from './SidePannel/SidePannel'
import Board from './Board/Board'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algo: 'DFS',
        };
        this.setAlgo = this.setAlgo.bind(this);
    }

    setAlgo(algorithm) {
        console.log('setAlgo: %s', algorithm);
        this.setState({algo: algorithm});
    }


    render() { 
        return (
            <div className="main_container">
                <SidePannel 
                    algo={this.state.algo}
                    algoHandler={this.setAlgo} />
                <Board algo={this.state.algo} />
            </div>
        );
    }
}
 
export default Main;