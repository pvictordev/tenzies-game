import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";
import { DieProps } from "./components/Die";
import Score from "./components/Score";

interface DieState {
  value: number;
  held: boolean;
  id: number;
}

export default function App(): JSX.Element {
  const [dice, setDice] = useState<DieState[]>(allNewDice());
  const [tenzies, setTenzies] = useState<boolean>(false);

  const [rollCount, setRollCount] = useState<number>(0);
  const [timer, setTimer] = useState({ seconds: 0, milliseconds: 0 });
  const [timerOn, setTimerOn] = useState<boolean>(false);

  const [bestRolls, setBestRolls] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number>(0);

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
      setRollCount((prevRollCount) => prevRollCount + 1);
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setRollCount(0);
      setTimer({ seconds: 0, milliseconds: 0 });
      setTimerOn(false);
    }
  }

  function holdDice(id: number) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, held: !die.held } : die))
    );
    setTimerOn(true);
  }
  //timer
  useEffect(() => {
    let interval: number | undefined;

    if (timerOn) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          let newMilliseconds = prevTime.milliseconds + 10;
          let newSeconds = prevTime.seconds;

          if (newMilliseconds >= 1000) {
            newSeconds++;
            newMilliseconds = 0;
          }

          return { seconds: newSeconds, milliseconds: newMilliseconds };
        });
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    setTimerOn(false);
  }, [tenzies]);

  const diceElements: JSX.Element[] = dice.map((die) => (
    // <Die key={die.id} {...(die as DieProps)} hold={() => holdDice(die.id)} />
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <section className="tenzies">
      {tenzies && <Confetti className="confetti" />}
      <main>
        <h1>Tenzies</h1>
        {!tenzies && (
          <p className="instructions">
            Roll until all dice are the same.
            <br /> Click each die to freeze it at its current value between
            rolls.
          </p>
        )}
        {tenzies && <p className="winner"> YOU WON!</p>}

        <div className="timer-counter">
          <p>
            Rolls: <span>{rollCount}</span>
          </p>
          <p>
            Timer:{" "}
            <span>{`${timer.seconds
              .toString()
              .padStart(2, "0")}:${timer.milliseconds
              .toString()
              .padStart(3, "0")
              .slice(0, 2)}`}</span>
          </p>
        </div>
        <div className="die-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollUnheldDice}>
          {tenzies ? "Reset" : "Roll"}
        </button>

        <Score />
      </main>
      <div>
        Coded by{" "}
        <a className="link" href="https://github.com/pvictordev">
          @pvictordev
        </a>
      </div>
    </section>
  );
}
