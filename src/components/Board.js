import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    cells = () => {

        let cells = this.props.cells.map((row, yRowNumber) => {
            let cells = [];
            row.forEach( (cell, xColumnNumber) => {
                cells.push(<Cell key={`cell-${yRowNumber}-${xColumnNumber}`} status={cell} x={xColumnNumber} y={yRowNumber} toggleCellState={this.props.toggleCellState} />)
            });
            return cells;
        })

        return cells;
    }

    render(){
        return(
            <div className="board">
                {this.cells()}
            </div>
        );
    }
}

export default Board;