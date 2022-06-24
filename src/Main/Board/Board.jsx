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
            placeStart: false,
            placeEnd: false,
            placeWall: false,
            startX: 0,
            startY: 0,
            finishX: 29,
            finishY: 49,
            algo: this.props.algo,
            algoritmRunning: false,
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
        var newNodes;
        if (this.state.placeStart)     { newNodes = this.placeStartCell(grid, row, col) }
        else if (this.state.placeEnd)  { newNodes = this.placeEndCell(grid, row, col) }
        else if (this.state.placeWall) { newNodes = this.placeNewWall(grid, row, col);} 
        else { return };
        this.setState({nodes: newNodes, mouseDown: true}); 
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseDown || !this.state.placeWall) return;
        const grid = this.state.nodes;
        var newNodes = this.placeNewWall(grid, row, col);   
        this.setState({nodes: newNodes}); 
    }

    resetButtons() {
        this.setState({placeStart: false});
        this.setState({placeEnd: false});
        this.setState({placeWall: false});
    }

    toggleStartCell() {
        if (!this.state.placeStart) { this.resetButtons(); }
        this.setState({placeStart: !this.state.placeStart});
    }

    toggleEndCell() {
        if (!this.state.placeEnd) { this.resetButtons(); }
        this.setState({placeEnd: !this.state.placeEnd});
    }

    togglePlaceWall() {
        if (!this.state.placeWall) { this.resetButtons(); }
        this.setState({placeWall: !this.state.placeWall});
    }

    placeStartCell(grid, row, col) {
        if (row === this.state.finishX && col === this.state.finishY) { return grid; }
        const newGrid = grid.slice();
        var node = newGrid[row][col];
        var newNode = {
            ...node,
            isStart: true,
        };
        newGrid[row][col] = newNode;
        node = newGrid[this.state.startX][this.state.startY];
        newNode = {
            ...node,
            isStart: false,
        };
        newGrid[this.state.startX][this.state.startY] = newNode;
        this.setState({startX: row, startY: col});
        return newGrid;
    }

    placeEndCell(grid, row, col) {
        if (row === this.state.startX && col === this.state.startY) { return grid; }
        const newGrid = grid.slice();
        var node = newGrid[row][col];
        var newNode = {
            ...node,
            isFinish: true,
        };
        newGrid[row][col] = newNode;
        node = newGrid[this.state.finishX][this.state.finishY];
        newNode = {
            ...node,
            isFinish: false,
        };
        newGrid[this.state.finishX][this.state.finishY] = newNode;
        this.setState({finishX: row, finishY: col});
        return newGrid;
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

    removeWalls() {
        const nodesList = this.getStartGrid();
        this.setState({nodes: nodesList}); 
    }

    getStartGrid() {
        const nodesList = [];
        for (let row = 0; row < MAX_ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < MAX_COLS; col++) {
                const neighbours = [];
                if (row > 0         ) { neighbours.push([row-1, col]); };
                if (row < MAX_ROWS-1) { neighbours.push([row+1, col]); };
                if (col > 0         ) { neighbours.push([row, col-1]); };
                if (col < MAX_COLS-1) { neighbours.push([row, col+1]); };
                const currentNode = {
                    col,
                    row,
                    isWall: false,
                    isStart: (col === 0 && row === 0),
                    isFinish: (col === MAX_COLS-1 && row === MAX_ROWS-1),
                    visited: false,
                    neighbours: neighbours,
                };
                currentRow.push(currentNode);
            }
            nodesList.push(currentRow);
        }
        console.log(nodesList);
        this.setState({ startX: 0, startY: 0 });
        return nodesList;
    }

    startAnimation() {
        if (this.state.algoritmRunning) { 
            this.setState({algoritmRunning: false}); 
            return; 
        } 
        if (this.props.algo === 'DFS') { this.DFSVisit(); }
        if (this.props.algo === 'BFS') { this.BFSVisit(); }
    }

    async BFSVisit() {

        await this.setState({algoritmRunning: true});

        const grid = this.state.nodes.slice();
        const startX = this.state.startX;
        const startY = this.state.startY;

        var queue = [];
        queue.push(grid[startX][startY]);

        while (queue.length && this.state.algoritmRunning) {

            var currNode = queue.shift();
           
            for (let i = 0; i < currNode.neighbours.length; i++) {
                console.log(currNode.neighbours[i]);
                var neighbour = currNode.neighbours[i];
                var neighbourNode = grid[neighbour[0]][neighbour[1]];
                if (!neighbourNode.visited && !neighbourNode.isWall) {
                    queue.push(neighbourNode);

                    const newGrid = this.state.nodes.slice();
                    const node = newGrid[neighbour[0]][neighbour[1]];
                    const newNode = {
                        ...node,
                        visited: true,
                    };
                    newGrid[neighbour[0]][neighbour[1]] = newNode;
                    this.setState({nodes: newGrid});

                    await new Promise(resolve => setTimeout(resolve, 1))
                    
                }
            }
        }
        this.setState({algoritmRunning: false})
    }

    async DFSVisit() {

        console.log('DFS');

        await this.setState({algoritmRunning: true});

        const grid = this.state.nodes.slice();
        const startX = this.state.startX;
        const startY = this.state.startY;

        var stack = [];

        stack.push(grid[startX][startY]);

        console.log(this.state.algoritmRunning);
        while (stack.length && this.state.algoritmRunning) {

            var currNode = stack.pop();
            
            if (!currNode.visited) {
                const newGrid = this.state.nodes.slice();
                const node = newGrid[currNode.row][currNode.col];
                const newNode = {
                    ...node,
                    visited: true,
                };
                newGrid[currNode.row][currNode.col] = newNode;
                this.setState({nodes: newGrid});

                await new Promise(resolve => setTimeout(resolve, 1))
            }

            for (let i = 0; i < currNode.neighbours.length; i++) {
                var neighbour = currNode.neighbours[i];
                var neighbourNode = grid[neighbour[0]][neighbour[1]];
                if(!neighbourNode.visited && !neighbourNode.isWall) {
                    stack.push(neighbourNode)
                }
            }
        }
        this.setState({algoritmRunning: false})
    }

    async Dijkstra() {

        console.log('Dijkstra');

        
    }

    render() { 
        const nodes = this.state.nodes;
        return (
            <div className='board-container'>
                <div className='button-container'>
                    <div id={`${this.state.placeStart ? 'selected' : ''}`}
                        className='button-cell'      
                        onClick={() => this.toggleStartCell()}>
                            <p>Start Cell</p>
                    </div>
                    <div id={`${this.state.placeEnd ? 'selected' : ''}`} 
                        className='button-cell'      
                        onClick={() => this.toggleEndCell()}>
                            <p>End Cell</p>
                    </div>
                    <div id='button-cell' 
                        className='button-cell'   
                        onClick={() => this.startAnimation()}>
                            <p>{this.state.algoritmRunning ? "Stop" : "Begin " + this.props.algo}</p>
                    </div>
                    <div id={`${this.state.placeWall ? 'selected' : ''}`}
                        className='button-cell'
                        onClick={() => this.togglePlaceWall()}>
                            <p>Add Walls</p>
                    </div>
                    <div id='button-cell' 
                        className='button-cell' 
                        onClick={() => this.removeWalls()}>
                            <p>Reset Board</p>
                    </div>
                </div>
                <div className='tile-container'>
                    {nodes.map((row, rowIndex) => {
                        return <div className='tile-row' key={rowIndex}>
                            {row.map((node, nodeIndex) => {
                                var { col, row, isWall, isStart, isFinish, visited, neighbours } = node;
                                return <Tile 
                                    key={col} 
                                    row={row} 
                                    col={col}
                                    isWall={isWall} 
                                    isStart={isStart} 
                                    isFinish={isFinish} 
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