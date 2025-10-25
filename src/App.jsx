// Game
//   ->Board
//     ->  Square
//   -> History
import { useState } from "react";
function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue("X");
  }
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
  return (
    <>
      <div className="flex">
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="flex">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="flex">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
