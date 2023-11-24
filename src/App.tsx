import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css"
import Die, { DieProps } from "./Die";

interface DieState {
  value: number;
  held: boolean;
  id: number;
}

export default function App(): JSX.Element {
  const [dice, setDice] = useState<DieState[]>(allNewDice());
  const [tenzies, setTenzies] = useState<boolean>(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every((die) => die.held);
    const allSameNumber = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  function randomDieValue(): number {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice(): DieState[] {
    const newArray: DieState[] = [];
    for (let i = 0; i < 10; i++) {
      const newDie: DieState = {
        value: randomDieValue(),
        held: false,
        id: i + 1,
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, i) =>
          die.held ? die : { value: randomDieValue(), held: false, id: i + 1 }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id: number) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, held: !die.held } : die))
    );
  }

  const diceElements: JSX.Element[] = dice.map((die) => (
    <Die key={die.id} {...(die as DieProps)} hold={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollUnheldDice}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </main>
  );
}
