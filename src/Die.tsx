import React from "react";

interface DieProps {
  held: boolean;
  value: number;
  hold: () => void;
}

export default function Die(props: DieProps): JSX.Element {
  const styles: React.CSSProperties = {
    backgroundColor: props.held ? "#59E391" : "white",
  };

  return (
    <div className="die-face" onClick={props.hold} style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
