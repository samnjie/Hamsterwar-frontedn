import "./Battle.css";
import Card from "./Card";
import { useState, useEffect } from "react";

const Battle = (props) => {
  const [hamsterOne, setHamsterOne] = useState(null);
  const [hamsterTwo, setHamsterTwo] = useState(null);

  useEffect(() => {
    const getHamsters = async () => {
      let firstHamster;
      let secondHamster;

      /* Gör så att en hamster inte kan möta sig själv. */
      do {
        for (let i = 0; i <= 1; i++) {
          const response = await fetch("hamsters/random");
          const data = await response.json();

          if (i === 0) firstHamster = data;
          if (i === 1) secondHamster = data;
        }
      } while (firstHamster.id === secondHamster.id);

      setHamsterOne(firstHamster);
      setHamsterTwo(secondHamster);
    };
    getHamsters();
  }, []);

  return (
    <>
      {hamsterOne && hamsterTwo ? (
        <div className="battle-container setHamsterOne">
          <Card />
          name = firstHamster.name
          <Card />
        </div>
      ) : (
        <h3>Loading</h3>
      )}
    </>
  );
};

export default Battle;
