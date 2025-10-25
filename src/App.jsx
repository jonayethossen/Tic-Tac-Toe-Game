// Game
//   ->Board
//     ->  Square
//   -> History
function Square({ value }) {
  return (
    <button className="text-5xl font-bold border border-2 m-2 h-20 w-20">
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div>
        <Square value={1} />
        <Square value={2} />
        <Square value={3} />
      </div>
      <div>
        <Square value={4} />
        <Square value={5} />
        <Square value={6} />
      </div>
      <div>
        <Square value={7} />
        <Square value={8} />
        <Square value={9} />
      </div>
    </>
  );
}
