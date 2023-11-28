import React from "react";

export default function Score() {
  //   interface DieState {
  //     value: number;
  //     held: boolean;
  //     id: number;
  //   }

  return (
    <div className="records">
      <p>
        Best Rolls | <span className="record">0</span>
      </p>
      <p>
        Best Time | <span className="record">0s</span>
      </p>
    </div>
  );
}
