import React, { Component } from 'react'
import './Board.css';
import Tile from './Tile/Tile'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxRows: 30,
            maxCols: 50,
            nodes: [],
        };
    }

    componentDidMount() {
        const nodesList = [];
        for (let row = 0; row < this.state.maxRows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.maxCols; col++) {
                const currentNode = {
                    col,
                    row,
                };
                currentRow.push(currentNode);
            }
            nodesList.push(currentRow);
        }
        this.setState({nodes: nodesList}); 
    }

    render() { 
        const { nodes } = this.state;
        console.log(nodes);

        return (
            <div className='board-container'>
                <div className='tile-container'>
                    {nodes.map((row, rowIndex) => {
                        return <div className='tile-row' key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                return <Tile key={nodeIndex} row={rowIndex} col={nodeIndex} />
                            })}
                        </div>
                    })}
                </div>
            </div>
        );
    }
}
 
export default Board;