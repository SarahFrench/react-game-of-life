import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ cells, toggleCellState}) => {
    
    const boardsCells = () => {

        let boardsCells = cells.map((row, yRowNumber) => {
            let cells = [];
            row.forEach((cell, xColumnNumber) => {
                cells.push(<Cell key={`cell-${yRowNumber}-${xColumnNumber}`} status={cell} toggleCellState={() => { toggleCellState(xColumnNumber, yRowNumber) }} />)
            });
            return cells;
        })

        return boardsCells;
    }

    return (
        <div className="board">
            {boardsCells()}
        </div>
    );
};

export default Board;