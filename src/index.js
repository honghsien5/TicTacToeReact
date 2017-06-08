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
		const magicSquares = [8,1,6,3,5,7,4,9,2]
		this.state = {
			squares: Array(9).fill(null),
			magicSquares: magicSquares,
			xIsNext: true,
			moveCount: 0,
		};
	}

	checkGameEnd(i, squares){
		const squareMark = squares[i];
		const n = 3;
		const arrayIndex = i;
		console.log('start');
		// check col
		const colIndex = parseInt(arrayIndex/3)
		for(var j = 0 ; j < n ; j++){
			const colIndex = parseInt(arrayIndex/3)

			if(squares[colIndex + j*n] !== squareMark){
				console.log("break");
				break;
			}

			if(j == n-1){
				console.log("true");
				return true;
			}
		}

		var rowIndex;
		if(arrayIndex%n == 0){
			console.log("hi");
			rowIndex = arrayIndex;
		}else{
			rowIndex = arrayIndex -(n-1);
		}

		// check row
		for(var j = 0 ; j < n ; j++){
			if(squares[rowIndex + j] !== squareMark){
				console.log("break");
				break;
			}
			
			if(j == (n-1)){
				console.log("true");
				return true;
			}

		}

		// check diag
		if(i == 0 || i == 4 || i == 8){
			for(var j = 0 ; j < n ; j++){							
				if(squares[j*n +j] !== squareMark){
					break;
				}

				if(j==n-1){
					console.log("true");
					return true;
				}
			}		
		}

		if(i == 2 || i == 4 || i == 6){
			for(var j = 0 ; j < n ; j++){
							console.log('4');
				if(squares[j*n - j + n- 1] !== squareMark){
					break;
				}

				if(j==n-1){
					console.log("true");
					return true;
				}
			}		
		}

		console.log('done');

		if(this.state.moveCount == (n^2) - 1){
			return false;
		}

		return false;
	}

	handleClick(i){
		const squares = this.state.squares.slice();
		
		if(this.state.xIsNext){
			squares[i] = 'X';
			this.setState({
				squares: squares,
				xIsNext: false,
				moveCount: ++this.state.moveCount,
			});
		}else{
			squares[i] = 'O';
			this.setState({
				squares: squares,
				xIsNext: true,
				moveCount: ++this.state.moveCount,
			});
		}

		if(this.checkGameEnd(i, squares) == true){
			squares[i] = "win";
			this.setState({
				squares: squares,
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
		const status = 'Next player: X';

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
