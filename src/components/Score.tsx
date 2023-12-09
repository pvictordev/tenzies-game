import { useEffect, useState } from "react";

export default function Score({ rollCount, timer, tenzies }) {
  return (
    <div className="records">
      <p>
        Best Rolls | <span className="record">{tenzies ? rollCount : "0"}</span>
      </p>
      <p>
        Best Time |{" "}
        <span className="record">
          {tenzies ? (
            <span>{`${timer.seconds
              .toString()
              .padStart(2, "0")}.${timer.milliseconds
              .toString()
              .padStart(3, "0")
              .slice(0, 2)}s`}</span>
          ) : (
            "0s"
          )}
        </span>
      </p>
    </div>
  );
}
