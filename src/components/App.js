import React from 'react';
import Game from './Game';
import './App.css';

class App extends React.Component {
  render(){
    return(
      <div className="app">
        <h1>Game of Life</h1>
        <p>(WIP)</p>
        <Game />
      </div>
    );
  }
}

export default App;
