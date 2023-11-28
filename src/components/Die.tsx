import React from "react";

interface DieProps {
  held: boolean;
  value: number;
  hold: () => void;
}

export default function Die(props: DieProps): JSX.Element {
  let dieFace = "";
  switch (props.value) {
    case 1:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    case 2:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    case 3:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    case 4:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    case 5:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    case 6:
      dieFace = `./src/assets/dice-${props.value}.png`;
      break;
    default:
      break;
  }

  const styles: React.CSSProperties = {
    backgroundColor: props.held ? "#59E391" : "white",
    backgroundImage: `url(${dieFace})`,
  };

  return (
    <div className="die-face" onClick={props.hold} style={styles}>
      {/* <h2 className="die-num">{props.value}</h2> */}
    </div>
  );
}
