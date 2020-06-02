import React from 'react';
import './Game.css';

import GameOfLife from '../code/GameOfLife.js';
import Board from './Board';
import Cell from './Cell';


class Game extends React.Component {
    
    constructor(props){
        super(props)
        
        let game = new GameOfLife();
        let boardStartingState = [
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        game.setupBoard(boardStartingState);

        this.state = {
            game: game,
            gameMode : 'manual'
        }
    }

    componentDidMount(){
        setInterval( () => {
            if(this.state.gameMode === 'automatic'){
                this.takeTurn();
                if (!this.anyLifePresent()) {
                    // this.seedLife();
                    this.useManualMode();
                }
            }
        }, 500)
    }

    componentDidUpdate(){
    }

    anyLifePresent = () =>{
        return this.state.game.searchForAnyLife();
    }

    toggleCellState = (x,y) =>{
        let newGame = this.state.game;
        let state = newGame.currentState[y][x];
        newGame.currentState[y][x] = state === 1 ? 0 : 1;
        this.setState({ game: newGame });
    }

    toggleGameMode = () => {
        let newMode = this.state.gameMode === 'automatic' ? 'manual' : 'automatic';
        this.setState({
            gameMode: newMode
        })
    }

    useManualMode = () => {
        this.setState({
            gameMode: 'manual'
        })
    }

    createBoard(){
        let rows = [];
        this.state.game.currentState.forEach( (row, y) => {
            let cells = [];
            row.forEach( (cellStatus, x) => {
                cells.push(< Cell key={`cell-${x}-${y}`} status={cellStatus} x={x} y={y} toggleCellState={this.toggleCellState} />)
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

    getGameModeLogo = () => {
        return (this.state.gameMode === "automatic" ? 'pause' : 'play');
    }

    getButtonClasses = () => {
        return (this.state.gameMode === "automatic" ? 'ui button disabled' : 'ui button');
    }

    getPlayButtonText = () => {
        return (this.state.gameMode === "automatic") ? "Pause & swap to manual mode" : "Start automatic mode";
    }

    render() {
        return (
            <div className="game center-content">
                <div className="stats">
                    <p>
                        {`Turns : ${this.state.game.turns}`}
                    </p>
                    <p className={!this.anyLifePresent() ? "visible" : "hidden"}>
                        All your cells died <span role="img" aria-label="crying emoji">😭</span>
                    </p>
                </div>
                <div className="mb-3">
                    <Board cells={this.state.game.currentState} toggleCellState={this.toggleCellState} />
                </div>
                <div className="controls center-content">
                    <h4 className="ui horizontal divider header">
                        <i className="sliders horizontal icon"></i>
                        Controls
                    </h4>
                    <div className="mb-1">
                        <button
                            className="ui labeled icon button"
                            onClick={this.toggleGameMode}
                        >
                            <i className={`${this.getGameModeLogo()} icon`}></i>
                            {this.getPlayButtonText()}
                        </button>
                    </div>
                    <div className="mb-1">
                        <input className={this.getButtonClasses()} data-testid="take-turn" type="button" onClick={this.takeTurn} value="Click to take a turn"></input>
                        <input className={this.getButtonClasses()} data-testid="seed-life" type="button" onClick={this.seedLife} value="Reset game"></input>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            Use the controls above to run the game in automatic or manual mode. Click on cells to toggle alive/dead, or click 'Reset game' to seed life throughout the board.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
