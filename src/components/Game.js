import React from 'react';
import './Game.css';

import GameOfLife from '../code/GameOfLife.js';


class Game extends React.Component {
    
    constructor(props){
        super(props)
        
        let game = new GameOfLife();
        let boardStartingState = [
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0]
        ]
        game.setupBoard(boardStartingState);

        this.state = {
            game: game
        }
    }
    
    componentDidMount(){
    }

    renderCell(cellValue, x, y){
        const cellState = !!cellValue ? 'alive' : 'dead';
        return (
            <div key={`cell-${x}-${y}`} className={`board__cell ${cellState}`}>
            </div>
        );
    }

    createBoard(){
        let rows = [];
        this.state.game.currentState.forEach( (row, y) => {
            let cells = [];
            row.forEach( (cell, x) => {
                cells.push(this.renderCell(cell, x, y))
            });
            rows.push(<div className="board__row" key={`row-${y}`}>{cells}</div>);
        });
        return rows;
    }

    takeTurn = () =>{
        let game = this.state.game;
        game.takeTurn();
        this.setState({gmae: game});
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    {this.createBoard()}
                </div>
                <div className="button">
                    <input data-testid="take-turn" type="button" onClick={this.takeTurn} value="Click to take a turn"></input>
                </div>
            </div>
        );
    }
}

export default Game;
