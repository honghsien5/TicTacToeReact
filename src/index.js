  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    );
  }

  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />
      );
    }

    render() {
      return (
        <div>
        <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        </div>
        <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        </div>
        <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        </div>
        </div>
      );

    }

  }

  class Game extends React.Component {
    constructor(){
      super();
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    checkGameEnd(squares){
      const n = 3;

      // check row
      for(var row = 0 ; row < n ; row++){
        // first square of the row
        var squareMark = squares[n*row];

        if(squareMark == null){
          continue;
        }
        for(var col = 1 ; col < n ; col++){
          if(squares[n*row + col] != squareMark){
            break;
          }

          if(col == n-1){
            return squareMark;
          }
        }
      }

      //check col
      for(var col = 0 ; col < n ; col++){
        // first square of the col
        const squareMark = squares[col];
        if(squareMark == null){
          continue;
        }

        for(var row = 1 ; row < n ; row++){
          if(squares[row*n + col] != squareMark){
            break;
          }

          if(row == n-1){
            return squareMark;
          }
        }
      }

      if(squares[0] != null){
        for(var diag = 0 ; diag < n ; diag++){
          if(squares[diag + diag * n] != squares[0]){
            break;
          }

          if(diag == n-1){
            return squares[0];
          }
        }
      }

      if(squares[n-1] != null){
        for(var rDiag = 0 ; rDiag < n ; rDiag++){
          if(squares[(n-1) + rDiag * n - rDiag] != squares[n-1]){
            break;
          }

          if(rDiag == n-1){
            return squares[n-1];
          }
        }
      }

      return null;
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (this.checkGameEnd(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: (this.state.stepNumber%2) ? true : false,
        stepNumber: history.length,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this.checkGameEnd(current.squares);

      let status;
      if(winner != null){
        status = "Winner: " + winner
      }else{
        status = "Next Player: " + (this.state.xIsNext ? "X":"O");
      }
      const moves = history.map((step, move) => {
        const desc = move ?
        'Move #' + move :
        'Game start';
        return (
          <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
      });

      return (
        <div className="game">
        <div className="game-board">
        <Board
        squares={current.squares}
        onClick={(i) => this.handleClick(i)}
        />
        </div>
        <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        </div>
        </div>

      );
    }
  }

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
