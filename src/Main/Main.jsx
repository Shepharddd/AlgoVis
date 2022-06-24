import React, { Component } from 'react';
import './Main.css';
import SidePannel from './SidePannel/SidePannel'
import Board from './Board/Board'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algo: "dykstra",
        };
    }
    render() { 
        return (
            <div className="main_container">
                <SidePannel />
                <Board />
            </div>
        );
    }
}
 
export default Main;