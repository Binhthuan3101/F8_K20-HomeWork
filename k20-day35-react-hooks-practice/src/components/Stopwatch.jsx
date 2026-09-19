import { useRef, useState } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Stopwatch</h2>
      <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
        {seconds}s
      </div>
      <div className="flex gap-2">
        <button
          onClick={startTimer}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Bắt đầu
        </button>
        <button
          onClick={stopTimer}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
        >
          Tạm dừng
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
