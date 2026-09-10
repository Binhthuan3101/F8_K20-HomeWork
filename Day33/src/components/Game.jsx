import Board from "./Board";
import { useState } from "react";

export default function Game() {
    const [isNext, setIsXNext] = useState(true);
    const [history, setHistory] = useState(Array(9).fill(null));
    const [currentMove, setCurrentMove] = useState(0);

    const handleChange = (newSquare) => {
        const newHistory = [...history.slice(0, currentMove)];
        setHistory(newHistory);
        setIsXNext(!isNext);
        setCurrentMove(newHistory.length - 1);
    }

    const jumpTo = (move) => {
        setCurrentMove(move);
        setIsXNext(move % 2 === 0);
    }

    const moves = history.map((Square, move) => {
        const description = move ? `Go to move ${move}` : "Go to game";
        return (
            <li key={move}> 
                <button onClick={()=>jumpTo(move)} className="border border-gray-300 rounded-md p-3">{ description}</button>
            </li>
        )
    })
  return (
    <div className="flex gap-10">
          <Board />
          <div className="list-decimal mt-3">
              <ol>
                  <li>Move 1</li>
                  <li>Move 2</li>
                  <li>Move 3</li>
              </ol>
          </div>
    </div>
  );
}
