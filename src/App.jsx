// // Game
// //   ->Board
// //     ->  Square
// //   -> History
// import { useState } from "react";

// function Square({ value, onSquareClick }) {
//   return (
//     <button
//       className="text-5xl font-bold border-2 m-2 h-20 w-20 "
//       onClick={onSquareClick}
//     >
//       {value}
//     </button>
//   );
// }
// // Board function
// function Board({ xIsNext, squares, onPlay }) {
//   const winnner = claculateWinner(squares);
//   let status;
//   if (winnner) {
//     status = `Winner : ${winnner}`;
//   } else {
//     status = "Next Player : " + (xIsNext ? "X" : "O");
//   }
//   function handleClick(i) {
//     if (squares[i] || claculateWinner(squares)) {
//       return;
//     }
//     const nextSquare = squares.slice();
//     if (xIsNext) {
//       nextSquare[i] = "X";
//     } else {
//       nextSquare[i] = "O";
//     }
//     onPlay(nextSquare);
//   }
//   return (
//     <>
//       <div className="text-3xl font-bold">{status}</div>
//       <div className="flex">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="flex">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="flex">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }
// // Public function
// export default function Game() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquare) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//     setXIsNext(!xIsNext);
//   }
//   function jumpTO(nextMove) {
//     setCurrentMove(nextMove);
//     setXIsNext(nextMove % 2 === 0);
//   }
//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = "GO TO Move #" + move;
//     } else {
//       description = "GO TO Game Start";
//     }
//     return (
//       <li key={move} className="border-2">
//         <button onClick={() => jumpTO(move)}>{description}</button>
//       </li>
//     );
//   });
//   return (
//     <div className="flex gap-10 mt-20 justify-center">
//       <div>
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div>
//         <ol className="text-3xl font-bold">{moves}</ol>
//       </div>
//     </div>
//   );
// }

// //Winner Calculate function
// function claculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

import { useState } from "react";

// Square Component
function Square({ value, onSquareClick }) {
  const baseStyle =
    "text-5xl font-black rounded-2xl h-24 w-24 flex items-center justify-center transition-all duration-300 shadow-inner border border-gray-700/50";
  const xStyle =
    "text-cyan-400 bg-gradient-to-br from-cyan-950/40 to-cyan-900/10 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]";
  const oStyle =
    "text-rose-400 bg-gradient-to-br from-rose-950/40 to-rose-900/10 drop-shadow-[0_0_12px_rgba(251,113,133,0.6)]";
  const emptyStyle =
    "bg-slate-800/60 text-transparent hover:bg-slate-700/80 active:scale-95 cursor-pointer";

  return (
    <button
      className={`${baseStyle} ${value === "X" ? xStyle : value === "O" ? oStyle : emptyStyle}`}
      onClick={onSquareClick}
    >
      {value || "-"}
    </button>
  );
}

// Board Component
function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  let statusClass =
    "text-2xl font-bold tracking-wide px-6 py-2 rounded-full border ";

  if (winner) {
    status = `🎉 Winner: ${winner}`;
    statusClass +=
      winner === "X"
        ? "bg-cyan-950/50 text-cyan-400 border-cyan-500/30 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        : "bg-rose-950/50 text-rose-400 border-rose-500/30 animate-pulse shadow-[0_0_15px_rgba(251,113,133,0.2)]";
  } else if (squares.every(Boolean)) {
    status = "🤝 Game Draw!";
    statusClass += "bg-amber-950/50 text-amber-400 border-amber-500/30";
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
    statusClass += xIsNext
      ? "bg-slate-800/80 text-cyan-400 border-cyan-500/20"
      : "bg-slate-800/80 text-rose-400 border-rose-500/20";
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    nextSquare[i] = xIsNext ? "X" : "O";
    onPlay(nextSquare);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className={statusClass}>{status}</div>
      <div className="bg-slate-900/60 p-4 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl flex flex-col gap-3">
        <div className="flex gap-3">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex gap-3">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex gap-3">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

// Main Game Component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Reset Game 🔄";
    const isCurrent = move === currentMove;

    return (
      <li key={move} className="mb-2.5">
        <button
          className={`w-full text-left text-sm font-semibold px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
            isCurrent
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500 shadow-lg shadow-indigo-500/30 scale-[1.02]"
              : "bg-slate-800/40 text-slate-300 border-slate-700/50 hover:bg-slate-700/60 hover:text-white"
          }`}
          onClick={() => jumpTo(move)}
        >
          <span>{description}</span>
          {isCurrent && (
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
          )}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30">
      {/* Background Neon Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <h1 className="relative text-4xl md:text-5xl font-black mb-12 tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
        TIC TAC TOE
      </h1>

      <div className="relative w-full max-w-4xl flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-full flex justify-center lg:w-auto">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>

        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-8 lg:pt-0 lg:pl-10 flex flex-col">
          <h2 className="text-xl font-bold text-slate-400 mb-4 tracking-wide uppercase text-center lg:text-left">
            Timeline / History
          </h2>
          <ol className="list-none p-0 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {moves}
          </ol>
        </div>
      </div>
    </div>
  );
}

// Winner Calculation Helper
function calculateWinner(squares) {
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
