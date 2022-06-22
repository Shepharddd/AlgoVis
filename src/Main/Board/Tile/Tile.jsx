import React, { Component } from 'react'
import './Tile.css';

class Tile extends Component {
    // TODO: remove the constructor
    constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        col: this.props.col,
        visited: false,
        isWall: this.props.isWall,
      };
      this.toggleWall = this.toggleWall.bind(this);
    }

    toggleWall() {
        let currState = this.state.isWall;
        this.setState({ isWall: !currState });
    }
  
    render() {
      // TODO: use onClick={this.props.onClick}
      // TODO: replace this.state.value with this.props.value
      const extraClass = this.state.isWall ? 'wall' : '';
      return (
        <div 
            id={`node-${this.state.row}-${this.state.col}`}
            className={`square ${extraClass}`} 
        />
      );
    }
  }

  export default Tile;