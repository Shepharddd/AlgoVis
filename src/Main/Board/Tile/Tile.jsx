import React, { Component } from 'react'
import './Tile.css';

class Tile extends Component {
    render() {
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            visited,
            row,
        } = this.props;

      const extraClass = isWall ? 'wall' : isStart ? 'start' : isFinish ? 'finish' : visited ? 'visited' : '';
      return (
        <div id={`node-${row}-${col}`}
            className={`square ${extraClass}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()} />
      );
    }
  }

  export default Tile;