class GameOfLife {

  setupBoard(board){
    if (!this.initialStateValid(board)) {
      throw new Error('Make sure the supplied board is a 2D array, with consistent row lengths');
    }

    this.currentState = board;
    this.largestYCoordinate = board.length - 1;
    this.largestXCoordinate = board[0].length - 1;
    this.futureState = [];
    this.turns = 0;

    this.resetFutureState();
  }

  initialStateValid(board){
    if( !board || typeof board !== 'object' || board.length < 2){
      //board absent, not likely to be array, or has less than 2 rows
      return false;
    }

    if (!board.forEach){
      //object is an actual object, not an array
      return false;
    }

    //check for consistent row length
    let rowsConsistentLength = true;
    board.forEach( row => {
      rowsConsistentLength = (row.length !== board[0].length) ? false : rowsConsistentLength;
    })

    return rowsConsistentLength;
  }

  resetFutureState(){
    this.futureState = [];
    for(let i=0; i <= this.largestYCoordinate; i++){
      this.futureState[i] = [];
    }
  }

  takeTurn(){

    this.currentState.forEach( (row, y) => {
      row.forEach( (cell, x) => {
          //cycle through every position (x,y) in the board
          if(this.isCellAlive(x,y)){
            //position is alive, should it die?
            const futureValue = this.shouldCellDie(x,y) ? 0 : 1;
            this.futureState[y].push(futureValue);
          } else {
            //position is dead, should it become alive?
            const futureValue = this.shouldCellBecomeAlive(x,y) ? 1 : 0;
            this.futureState[y].push(futureValue);
          }
      })
    })

    this.currentState = this.futureState;
    this.turns += 1;
    this.resetFutureState()
  }

  shouldCellDie(x,y){

    const neighbours = this.numberOfLivingNeighbours(x,y);

    /*
    Return true, die, if fewer than two OR more than 3 neighbours.
    Otherwise, false; don't die.
    */
    return neighbours < 2 || neighbours > 3;
  }

  shouldCellBecomeAlive(x,y){
    const neighbours = this.numberOfLivingNeighbours(x,y);
    /*
    Return true, live if exactly 3 neighbours.
    Otherwise, false; don't live.
    */
    return neighbours === 3;
  }

  numberOfLivingNeighbours(x,y){
    const neighbourVectors = [
      [1,1],
      [1,0],
      [0,1],
      [-1,1]
    ];

    let aliveNeighboursCount = 0;

    neighbourVectors.forEach( vector => {
      for (let i=-1; i <=1; i++){
        if(i!==0){
          /*
            for and if loops cause positons -1 and +1, but not 0, along the vectors
            be considered neighbours and be tested for live
          */

          const neighbourX = x + vector[0]*i;
          const neighbourY = y + vector[1]*i;

          if( neighbourY >= 0 && neighbourX >= 0 && neighbourY <= this.largestYCoordinate && neighbourX <= this.largestXCoordinate){
            //coordinates are in bounds; is a valid neighbour
            if (this.isCellAlive(neighbourX, neighbourY)){
              aliveNeighboursCount += 1;
            }
          }

        }
      }
    })

    return aliveNeighboursCount;
  }

  isCellAlive(x,y){
    /*
      if the project changes to use something other than 1 and 0 to indicate life,
      this is place to reflect that change
    */
    return this.currentState[y][x] === 1;
  }

  searchForAnyLife(){
    let lifeFound = false;
    this.currentState.forEach( row => {
      row.forEach( cell => {
          lifeFound = cell ? true : lifeFound;
      })
    })
    return lifeFound;
  }

  printBoard(){
    this.currentState.forEach(row => {
      console.log(row);
    })
  }
}

export default GameOfLife;
