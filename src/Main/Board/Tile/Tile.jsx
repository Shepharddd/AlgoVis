import React, { Component } from 'react'
import './Tile.css';

class Tile extends Component {
    // TODO: remove the constructor
    constructor(props) {
      super(props);
    //   this.state = {
    //     row: this.props.row,
    //     col: this.props.col,
    //     visited: this.props.visited,
    //     isWall: this.props.isWall,
    //     onMouseDown: this.props.onMouseDown,
    //     onMouseEnter: this.props.onMouseEnter,
    //     onMouseUp: this.props.onMouseUp,
    //   };
    }

    render() {
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
          } = this.props;

      // TODO: use onClick={this.props.onClick}
      // TODO: replace this.state.value with this.props.value
      const extraClass = isWall ? 'wall' : '';
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