import React, { Component } from 'react'
import './Board.css';
import Tile from './Tile/Tile'

const MAX_COLS = 50;
const MAX_ROWS = 30;

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            mouseDown: false,
        };
    }

    componentDidMount() {
        const nodesList = this.getStartGrid();
        this.setState({nodes: nodesList}); 
    }

    handleMouseUp() {
        this.setState({mouseDown: false}); 
    }

    handleMouseDown(row, col) {
        const grid = this.state.nodes;
        const newNodes = this.placeNewWall(grid, row, col);
        this.setState({nodes: newNodes, mouseDown: true}); 
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseDown) return;
        const grid = this.state.nodes;
        const newNodes = this.placeNewWall(grid, row, col);
        this.setState({nodes: newNodes}); 
    }

    getStartGrid() {
        const nodesList = [];
        for (let row = 0; row < this.state.maxRows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.maxCols; col++) {
                const currentNode = {
                    col,
                    row,
                    isWall: false,
                    visited: false,
                };
                currentRow.push(currentNode);
            }
            nodesList.push(currentRow);
        }
        return nodesList;
    }

    render() { 
        const { nodes } = this.state;
        return (
            <div className='board-container'>
                <div className='tile-container'>
                    {nodes.map((row, rowIndex) => {
                        return <div className='tile-row' key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                return <Tile 
                                    key={nodeIndex} 
                                    row={rowIndex} 
                                    col={nodeIndex}
                                    isWall={this.state.nodes[rowIndex][nodeIndex].isWall}
                                />
                            })}
                        </div>
                    })}
                </div>
            </div>
        );
    }
}
 
export default Board;