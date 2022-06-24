import React, { Component } from 'react';
import './SidePannel.css';

class SidePannel extends Component {
    state = {
        traversalsInit: true,
        traversalOpen: false,
        searchInit: true,
        searchOpen: false,
        algo: this.props.algo
    } 

    toggleTraversal() {
        this.setState({traversalsInit: false, traversalOpen: !this.state.traversalOpen});
    }

    toggleSearch() {
        this.setState({searchInit: false, searchOpen: !this.state.searchOpen});
    }

    render() { 
        return (
            <div className='side-pannel-container'>
                <div className='side-pannel-category' onClick={() => this.toggleTraversal()}>
                    <p>Traversals</p>
                </div>
                <div 
                    className={`category-${this.state.traversalsInit === true ? 'init' : this.state.traversalOpen  ? 'open' : 'closed'}`}
                    onClick={() => this.props.algoHandler('DFS')}>
                    <p>Depth First</p>
                </div>
                <div 
                    className={`category-${this.state.traversalsInit === true ? 'init' : this.state.traversalOpen ? 'open' : 'closed'}`}
                    onClick={() => this.props.algoHandler('BFS')}>
                    <p>Bredth First</p>
                </div>
                <div className='side-pannel-category' onClick={() => this.toggleSearch()}>
                    <p>Search Algoritms</p>
                </div>
                <div 
                    className={`category-${this.state.searchInit === true ? 'init' : this.state.searchOpen ? 'open' : 'closed'}`}
                    onClick={() => this.props.algoHandler('Dijkstra')}>
                    <p>Dijkstra (Coming soon)</p>
                </div>
                <div 
                    className={`category-${this.state.searchInit === true ? 'init' : this.state.searchOpen ? 'open' : 'closed'}`}
                    onClick={() => this.props.algoHandler('A-Star')}>
                    <p>A Star (Coming soon)</p>
                </div>
            </div>
        );
    }
}
 
export default SidePannel;