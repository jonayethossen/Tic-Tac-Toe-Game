// Game
//   ->Board
//     ->  Square
//   -> History
import { useState } from "react";
function Square({ value }) {
  function handleClick() {}
  return (
    <button
      className="text-5xl font-bold border-2 m-2 h-20 w-20 "
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
//board function
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
      <div className="flex">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="flex">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="flex">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
