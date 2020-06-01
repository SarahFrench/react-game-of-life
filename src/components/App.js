import React from 'react';
import Game from './Game';
import './App.css';

class App extends React.Component {
  render(){
    return(
      <div className="app center-content">
        <h1>Game of Life</h1>
        <Game />
      </div>
    );
  }
}

export default App;
