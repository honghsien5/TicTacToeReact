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
	constructor(){
		super();
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	checkGameEnd(squares){
		const n = 3;

		// check row
		for(var i = 0 ; i < n ; i++){
			// first square of the row
			const squareMark = squares[n*i];
			if(squareMark == null){
				continue;
			}
			for(var j = 1 ; j < n ; j++){
				if(squares[n*i + j] != squareMark){
					break;
				}

				if(i == n-1 && j == n-1){
					return true;
				}
			}
		}

		//check col
		for(var col = 0 ; col < n ; col++){
			const squareMark = squares[col];
			if(squareMark == null){
				continue;
			}
			for(var row = 0 ; row < n ; row++){
				if(squares[row*n + col] != squareMark){
					break;
				}

				if(row == n-1 && col == n-1){
					return true;
				}
			}
		}

		if(squares[0] != null){
			for(var diag = 0 ; diag < n ; diag++){
				if(squares[diag + diag * n] != squares[0]){
					break;
				}

				if(diag == n-1){
					return true;
				}
			}
		}

		if(squares[n-1] != null){
			for(var rDiag = 0 ; rDiag < n ; rDiag++){
				if(squares[(n-1) + rDiag * n - rDiag] != squares[n-1]){
					break;
				}

				if(rDiag == n-1){
					return true;
				}
			}
		}

		return false;
	}

	handleClick(i){
		const squares = this.state.squares.slice();

		if(this.checkGameEnd(squares)){
			return;
		}

		if(this.state.xIsNext){
			squares[i] = 'X';
			this.setState({
				squares: squares,
				xIsNext: false,
			});
		}else{
			squares[i] = 'O';
			this.setState({
				squares: squares,
				xIsNext: true,
			});
		}
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		let status;
		if(this.checkGameEnd(this.state.squares)){
			status = "Winner: "
		}else{
			status = "Next Player: "
		}

		if(this.state.xIsNext){
			status += "X";
		}else{
			status += "O";
		}

		return (
			<div>
				<div className="status">{status}</div>
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
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>

		);
	}
}

ReactDOM.render(
  <Game />,
    document.getElementById('root')
);
