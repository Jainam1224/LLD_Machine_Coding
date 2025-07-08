import { useCallback, useState, useRef, useEffect } from "react";

const formatTime = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

const CountDownTimer = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const countdownRef = useRef(null);

  const hoursRef = useRef(hours);
  const minutesRef = useRef(minutes);
  const secondsRef = useRef(seconds);

  useEffect(() => {
    hoursRef.current = hours;
    minutesRef.current = minutes;
    secondsRef.current = seconds;
  }, [hours, minutes, seconds]);

  const stopInterval = useCallback((state) => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(state === "pause");
  }, []);

  const timerTick = useCallback(() => {
    let currentSec = parseInt(secondsRef.current || "0", 10);
    let currentMin = parseInt(minutesRef.current || "0", 10);
    let currentHr = parseInt(hoursRef.current || "0", 10);

    let totalSeconds = currentHr * 3600 + currentMin * 60 + currentSec;

    if (totalSeconds <= 0) {
      stopInterval();
      setHours("00");
      setMinutes("00");
      setSeconds("00");
      return;
    }

    totalSeconds -= 1;

    const newHours = Math.floor(totalSeconds / 3600);
    const remainingSecondsAfterHours = totalSeconds % 3600;
    const newMinutes = Math.floor(remainingSecondsAfterHours / 60);
    const newSeconds = remainingSecondsAfterHours % 60;

    setHours(formatTime(newHours));
    setMinutes(formatTime(newMinutes));
    setSeconds(formatTime(newSeconds));
  }, [stopInterval]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(timerTick, 1000);
  };

  const handleStop = () => {
    stopInterval("pause");
  };

  const handleReset = () => {
    stopInterval();
    setHours("");
    setMinutes("");
    setSeconds("");
    setIsPaused(false);
  };

  const handleTimeChange = (e, setter, maxVal) => {
    let value = e.target.value;
    if (value === "") {
      setter("");
      return;
    }
    const numValue = parseInt(value, 10);
    if (
      isNaN(numValue) ||
      numValue < 0 ||
      (maxVal !== undefined && numValue > maxVal)
    ) {
      return;
    }
    setter(numValue.toString());
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const isTimerZero =
    parseInt(hours || "0", 10) === 0 &&
    parseInt(minutes || "0", "0") === 0 &&
    parseInt(seconds || "0", 10) === 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10">
        Countdown Timer
      </h1>

      {/* Labels */}
      <div className="flex space-x-4 items-center justify-center mt-2 w-full max-w-xl">
        <label className="text-center font-semibold text-lg md:text-2xl flex-1 text-gray-700">
          Hours
        </label>
        <label className="text-center font-semibold text-lg md:text-2xl flex-1 text-gray-700">
          Minutes
        </label>
        <label className="text-center font-semibold text-lg md:text-2xl flex-1 text-gray-700">
          Seconds
        </label>
      </div>

      {/* Timer Inputs */}
      <div className="flex space-x-4 items-center justify-center mt-4 w-full max-w-xl">
        <input
          className="w-24 h-24 text-center font-bold text-3xl flex-1 border-2 border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
          type="number"
          min="0"
          max="99"
          placeholder="00"
          value={hours}
          onChange={(e) => handleTimeChange(e, setHours, 99)}
          disabled={isRunning}
        />
        <p className="text-4xl font-bold text-gray-700">:</p>
        <input
          className="w-24 h-24 text-center font-bold text-3xl flex-1 border-2 border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
          type="number"
          min="0"
          max="59"
          placeholder="00"
          value={minutes}
          onChange={(e) => handleTimeChange(e, setMinutes, 60)}
          disabled={isRunning}
        />
        <p className="text-4xl font-bold text-gray-700">:</p>
        <input
          className="w-24 h-24 text-center font-bold text-3xl flex-1 border-2 border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
          type="number"
          min="0"
          max="59"
          placeholder="00"
          value={seconds}
          onChange={(e) => handleTimeChange(e, setSeconds, 60)}
          disabled={isRunning}
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-10 w-full max-w-xl">
        <button
          onClick={handleStart}
          className={`flex-1 px-6 py-3 text-center font-bold text-xl rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105
            ${
              isRunning || isTimerZero
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          disabled={isRunning || isTimerZero}
        >
          {isPaused ? "Continue" : "Start"}
        </button>

        <button
          onClick={handleStop}
          className={`flex-1 px-6 py-3 text-center font-bold text-xl rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105
            ${
              isRunning
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!isRunning}
        >
          Stop
        </button>

        <button
          onClick={handleReset}
          className="flex-1 px-6 py-3 text-center font-bold text-xl rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDownTimer;
