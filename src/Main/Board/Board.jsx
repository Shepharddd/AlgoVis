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
        console.log("mouseDown: ");
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

    placeNewWall(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    getStartGrid() {
        const nodesList = [];
        for (let row = 0; row < MAX_ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < MAX_COLS; col++) {
                const neighbours = [];
                if (row > 0       ) { neighbours.push((row-1, col)); }
                if (row < MAX_ROWS) { neighbours.push((row+1, col)); }
                if (col > 0       ) { neighbours.push((row, col-1)); }
                if (col > MAX_COLS) { neighbours.push((row, col+1)); }
                const currentNode = {
                    col,
                    row,
                    isWall: false,
                    visited: false,
                    neighbours: neighbours,
                };
                currentRow.push(currentNode);
            }
            nodesList.push(currentRow);
        }
        return nodesList;
    }

    render() { 
        const { nodes, mouseDown } = this.state;
        return (
            <div className='board-container'>
                <div className='tile-container'>
                    {nodes.map((row, rowIndex) => {
                        return <div className='tile-row' key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                var { col, row, isWall, visited, neighbours } = node;
                                return <Tile 
                                    key={col} 
                                    row={row} 
                                    col={col}
                                    isWall={isWall} 
                                    visited={visited} 
                                    neighbours={neighbours}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}
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