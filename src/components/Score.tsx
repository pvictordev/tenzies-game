import { useEffect, useState } from "react";

export default function Score({ rollCount, timer, tenzies }) {
  const [currentRollCount, setCurrentRollCount] = useState(0);
  const [currentTimer, setCurrentTimer] = useState("0s");

  useEffect(() => {
    if (tenzies) {
      setCurrentRollCount(rollCount);
      // Проверяем, что timer является числом перед его использованием
      if (typeof timer === "number") {
        setCurrentTimer(`${timer}s`);
      }
    }
  }, [tenzies, rollCount, timer]);

  return (
    <div className="records">
      <p>
        Best Rolls | <span className="record">{currentRollCount}</span>
      </p>
      <p>
        Best Time | <span className="record">{currentTimer}</span>
      </p>
    </div>
  );
}
