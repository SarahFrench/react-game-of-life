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
        this.setState({game: game});
    }

    seedLife = () =>{
        let newBoard = this.state.game.currentState;

        for (let i = 0; i < this.state.game.currentState.length; i++) {
            for (let j = 0; j < this.state.game.currentState[i].length; j++) {
                newBoard[i][j] = (Math.random() > 0.5) ? 1 : 0;;
            }
        }
        let newGame = new GameOfLife();
        newGame.setupBoard(newBoard);
        // this.setState({ ...this.state.game, currentState: newGame.currentState });
        this.setState({ game: newGame });
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    {this.createBoard()}
                </div>
                <div className="button">
                    <input data-testid="take-turn" type="button" onClick={this.takeTurn} value="Click to take a turn"></input>
                    <input data-testid="seed-life" type="button" onClick={this.seedLife} value="Click to seed life"></input>
                </div>
            </div>
        );
    }
}

export default Game;
