import React from 'react';
import './Cell.css';

class Cell extends React.Component {

    getClassName(){
        return !!this.props.status ? 'alive' : 'dead';
    }

    render(){
        return (
            <div
                onClick={() => { this.props.toggleCellState(this.props.x, this.props.y) }}
                className={`board__cell ${this.getClassName()}`}
            >
            </div>
        );
    }

}

export default Cell;
