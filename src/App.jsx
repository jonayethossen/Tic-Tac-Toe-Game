// Game
//   ->Board
//     ->  Square
//   -> History
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="text-5xl font-bold border-2 m-2 h-20 w-20 "
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
// Board function
function Board({ xIsNext, squares, onPlay }) {
  const winnner = claculateWinner(squares);
  let status;
  if (winnner) {
    status = `Winner : ${winnner}`;
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    if (squares[i] || claculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }
  return (
    <>
      <div className="text-3xl font-bold">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// Public function
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTO(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "GO TO Move #" + move;
    } else {
      description = "GO TO Game Start";
    }
    return (
      <li key={move} className="border-2">
        <button onClick={() => jumpTO(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="flex gap-10 mt-20 justify-center">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol className="text-3xl font-bold">{moves}</ol>
      </div>
    </div>
  );
}

//Winner Calculate function
function claculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
