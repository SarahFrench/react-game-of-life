import React from 'react';
import './Cell.css';

const Cell = ({ status, toggleCellState}) => {
    const getClassName = () => {
        return !!status ? 'alive' : 'dead';
    }

    return (
        <div
            onClick={toggleCellState}
            className={`cell ${getClassName()}`}
        >
        </div>
    );
};

export default Cell;
