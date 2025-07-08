import React, { useState } from "react";

const CountDownTimer = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const countdownRef = null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-10">Countdown Timer</h1>

      {/* Labels */}
      <div className="flex space-x-2 items-center justify-between mt-2 w-90">
        <label className="text-center font-bold text-2xl flex-1">Hours</label>
        <label className="text-center font-bold text-2xl flex-1">Minutes</label>
        <label className="text-center font-bold text-2xl flex-1">Seconds</label>
      </div>

      {/* Timer */}
      <div className="flex space-x-2 items-center justify-between mt-2 w-90">
        <input
          className="w-20 h-20 text-center font-bold text-2xl flex-1"
          type="number"
          maxLength="2"
          placeholder="00"
          value={hours}
        />
        <p>:</p>
        <input
          className="w-20 h-20 text-center font-bold text-2xl flex-1"
          type="number"
          maxLength="2"
          placeholder="00"
          value={minutes}
        />
        <p>:</p>
        <input
          className="w-20 h-20 text-center font-bold text-2xl flex-1"
          type="number"
          maxLength="2"
          placeholder="00"
          value={seconds}
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 justify-between mt-2 w-90">
        <button className="flex-1 text-center font-bold text-2xl bg-green-500 text-white rounded">
          Start
        </button>
        {/* <button className="text-center font-bold text-2xl">
          Stop
        </button> */}
        <button className="flex-1 text-center font-bold text-2xl bg-orange-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDownTimer;
