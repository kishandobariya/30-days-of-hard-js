import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    // Retrieve stored time when component mounts
    const storedTime = localStorage.getItem("timerTime");
    if (storedTime) setTime(parseInt(storedTime));

    // Start the timer if it was running previously
    const wasTimerOn = localStorage.getItem("timerOn") === "true";
    if (wasTimerOn) setTimerOn(true);
  }, []);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          localStorage.setItem("timerTime", prevTime + 1);
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStart = () => {
    setTimerOn(true);
    localStorage.setItem("timerOn", "true");
  };

  const handleStop = () => {
    setTimerOn(false);
    localStorage.setItem("timerOn", "false");
  };

  const handleReset = () => {
    setTime(0);
    localStorage.setItem("timerTime", "0");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Persistent Timer</h2>
      </header>
      <div>
        <h2>Timer: {time} seconds</h2>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
