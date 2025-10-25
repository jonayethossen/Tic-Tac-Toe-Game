// Game
//   ->Board
//     ->  Square
//   -> History
function Square() {
  return (
    <button className="text-5xl font-bold border border-2 m-2 h-20 w-20">
      X
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
      <div>
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
