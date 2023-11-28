import React from "react";
import dice1 from "../assets/dice-1.png";
import dice2 from "../assets/dice-2.png";
import dice3 from "../assets/dice-3.png";
import dice4 from "../assets/dice-4.png";
import dice5 from "../assets/dice-5.png";
import dice6 from "../assets/dice-6.png";


interface DieProps {
  held: boolean;
  value: number;
  hold: () => void;
}

export default function Die(props: DieProps): JSX.Element {
  let dieFace = "";
  switch (props.value) {
    case 1:
      dieFace = dice1;
      break;
    case 2:
      dieFace = dice2;
      break;
    case 3:
      dieFace = dice3;
      break;
    case 4:
      dieFace = dice4;
      break;
    case 5:
      dieFace = dice5;
      break;
    case 6:
      dieFace = dice6;
      break;
    default:
      break;
  }

  const styles: React.CSSProperties = {
    backgroundColor: props.held ? "#59E391" : "",
    background: `url(${dieFace}) 0 0 / cover no-repeat`,
  };

  return (
    <div className="die-face" onClick={props.hold} style={styles}>
      {/* <h2 className="die-num">{props.value}</h2> */}
    </div>
  );
}
