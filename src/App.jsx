import { useState, useEffect } from "react";
import {
  Play,
  Bot,
  Users,
  ArrowLeft,
  Trophy,
  Handshake,
  Loader2,
  Gamepad2,
  RotateCcw,
} from "lucide-react";

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
function Board({
  xIsNext,
  squares,
  onPlay,
  locked,
  thinking,
  vsComputer,
  onRestart,
}) {
  const winner = calculateWinner(squares);
  let status;
  let statusClass =
    "text-2xl font-bold tracking-wide px-6 py-2 rounded-full border ";

  let statusIcon = null;

  if (winner) {
    const label = vsComputer
      ? winner === "X"
        ? "You win!"
        : "Computer wins"
      : `Winner: ${winner}`;
    status = label;
    statusIcon = <Trophy className="h-5 w-5" />;
    statusClass +=
      winner === "X"
        ? "bg-cyan-950/50 text-cyan-400 border-cyan-500/30 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        : "bg-rose-950/50 text-rose-400 border-rose-500/30 animate-pulse shadow-[0_0_15px_rgba(251,113,133,0.2)]";
  } else if (squares.every(Boolean)) {
    status = "Game Draw!";
    statusIcon = <Handshake className="h-5 w-5" />;
    statusClass += "bg-amber-950/50 text-amber-400 border-amber-500/30";
  } else if (thinking) {
    status = "Computer is thinking...";
    statusIcon = <Loader2 className="h-5 w-5 animate-spin" />;
    statusClass +=
      "bg-slate-800/80 text-rose-400 border-rose-500/20 animate-pulse";
  } else {
    status = vsComputer
      ? xIsNext
        ? "Your turn (X)"
        : "Computer's turn (O)"
      : `Next Player: ${xIsNext ? "X" : "O"}`;
    statusIcon = vsComputer && !xIsNext ? <Bot className="h-5 w-5" /> : null;
    statusClass += xIsNext
      ? "bg-slate-800/80 text-cyan-400 border-cyan-500/20"
      : "bg-slate-800/80 text-rose-400 border-rose-500/20";
  }

  function handleClick(i) {
    if (locked || squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquare = squares.slice();
    nextSquare[i] = xIsNext ? "X" : "O";
    onPlay(nextSquare);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className={`${statusClass} flex items-center gap-2`}>
        {statusIcon}
        {status}
      </div>

      {(winner || squares.every(Boolean)) && (
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300 border border-indigo-400/30"
        >
          <RotateCcw className="h-4 w-4" />
          Play Again
        </button>
      )}
      <div
        className={`bg-slate-900/60 p-4 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl flex flex-col gap-3 transition-opacity duration-300 ${
          locked ? "opacity-70 pointer-events-none" : ""
        }`}
      >
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

// Start Screen Component
function StartScreen({ onStart }) {
  const [mode, setMode] = useState("computer"); // "computer" | "friend"
  const [difficulty, setDifficulty] = useState("unbeatable"); // "easy" | "unbeatable"

  const modeBtn = (active) =>
    `flex-1 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all duration-300 ${
      active
        ? "bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 border-indigo-400/50 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-700/40 hover:text-slate-200"
    }`;

  const diffBtn = (active) =>
    `px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${
      active
        ? "bg-cyan-950/50 border-cyan-500/40 text-cyan-300"
        : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200"
    }`;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center gap-3 mb-8">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 border border-indigo-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Gamepad2 className="h-8 w-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent text-center">
          TIC TAC TOE
        </h1>
        <p className="text-slate-400 text-sm tracking-wide">Enjoy the game</p>
      </div>

      <div className="relative w-full max-w-sm flex flex-col gap-5 bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">
            Game Mode
          </p>
          <div className="flex gap-3">
            <button
              className={modeBtn(mode === "computer")}
              onClick={() => setMode("computer")}
            >
              <Bot className="h-6 w-6" />
              <span className="text-sm font-semibold">Vs Computer</span>
            </button>
            <button
              className={modeBtn(mode === "friend")}
              onClick={() => setMode("friend")}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm font-semibold">Vs Friend</span>
            </button>
          </div>
        </div>

        {mode === "computer" && (
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">
              Difficulty
            </p>
            <div className="flex gap-3 justify-center">
              <button
                className={diffBtn(difficulty === "easy")}
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className={diffBtn(difficulty === "unbeatable")}
                onClick={() => setDifficulty("unbeatable")}
              >
                Unbeatable
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onStart({ mode, difficulty })}
        className="relative mt-8 flex items-center gap-2 px-10 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.55)] hover:scale-[1.03] active:scale-95 transition-all duration-300 border border-indigo-400/30"
      >
        <Play className="h-5 w-5 fill-white" />
        Start Game
      </button>
    </div>
  );
}

// Main Game Component
export default function Game() {
  const [started, setStarted] = useState(false);
  const [vsComputer, setVsComputer] = useState(false);
  const [difficulty, setDifficulty] = useState("unbeatable");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [thinking, setThinking] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(Boolean);

  // Human is always X, computer is always O
  const isComputerTurn =
    vsComputer &&
    !xIsNext &&
    !winner &&
    !isDraw &&
    currentMove === history.length - 1;

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleStart({ mode, difficulty }) {
    setVsComputer(mode === "computer");
    setDifficulty(difficulty);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setStarted(true);
  }

  function handleBack() {
    setStarted(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setThinking(false);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setThinking(false);
  }

  // Let the computer move when it's its turn
  useEffect(() => {
    if (!isComputerTurn) return;
    setThinking(true);
    const timer = setTimeout(() => {
      const move = getComputerMove(currentSquares, difficulty);
      if (move !== -1) {
        const nextSquare = currentSquares.slice();
        nextSquare[move] = "O";
        handlePlay(nextSquare);
      }
      setThinking(false);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComputerTurn, currentSquares, difficulty]);

  if (!started) {
    return <StartScreen onStart={handleStart} />;
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Game Start";
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30">
      {/* Background Neon Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:bg-slate-700/70 hover:text-white active:scale-95 transition-all duration-300 backdrop-blur-md"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Restart Button */}
      <button
        onClick={handleRestart}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:bg-slate-700/70 hover:text-white active:scale-95 transition-all duration-300 backdrop-blur-md"
      >
        <RotateCcw className="h-4 w-4" />
        Restart
      </button>

      <div className="relative flex flex-col items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
          TIC TAC TOE
        </h1>
        <span className="mt-2 text-xs font-semibold tracking-widest uppercase text-slate-500 px-3 py-1 rounded-full border border-slate-700/60 bg-slate-800/50">
          {vsComputer ? `Vs Computer · ${difficulty}` : "Vs Friend"}
        </span>
      </div>

      <div className="relative w-full max-w-4xl flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-full flex justify-center lg:w-auto">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            locked={isComputerTurn || thinking}
            thinking={thinking}
            vsComputer={vsComputer}
            onRestart={handleRestart}
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

// Computer Move Logic
function getComputerMove(squares, difficulty) {
  const empty = squares
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  if (empty.length === 0) return -1;

  if (difficulty === "easy") {
    // 70% random, 30% best move — beatable but not silly
    if (Math.random() < 0.7) {
      return empty[Math.floor(Math.random() * empty.length)];
    }
    return bestMove(squares);
  }

  // Unbeatable: always pick the optimal move
  return bestMove(squares);
}

function bestMove(squares) {
  let best = { score: -Infinity, index: -1 };
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const next = squares.slice();
      next[i] = "O";
      const score = minimax(next, 0, false);
      if (score > best.score) {
        best = { score, index: i };
      }
    }
  }
  return best.index;
}

function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (squares.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const next = squares.slice();
        next[i] = "O";
        best = Math.max(best, minimax(next, depth + 1, false));
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const next = squares.slice();
        next[i] = "X";
        best = Math.min(best, minimax(next, depth + 1, true));
      }
    }
    return best;
  }
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
