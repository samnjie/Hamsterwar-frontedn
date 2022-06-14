import "./Battle.css";
import Card from "./Card";
import { useState, useEffect } from "react";

const Battle = (props) => {
  const [hamsterOne, setHamsterOne] = useState(null);//..
  const [hamsterTwo, setHamsterTwo] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const getHamsters = async () => {
      let firstHamster;
      let secondHamster;
      console.log("gethamsters");

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

  const vote = async (id) => {
    let winnerHamsterId = id;
    let loosingHamsterId = hamsterOne.id;

    let winner = hamsterTwo;
    let looser = hamsterOne;
    let winnerHamsterOne = false;

    if (id === hamsterOne.id) {
      loosingHamsterId = hamsterTwo.id;
      winner = hamsterOne;
      looser = hamsterTwo;
      winnerHamsterOne = true;
    }

    winner.wins += 1;
    looser.defeats += 1;

    const winnerRequest = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: winner.name,
        age: winner.age,
        favFoods: winner.favFoods,
        loves: winner.loves,
        imgName: winner.imgName,
        wins: winner.wins,
        defeats: winner.defeats,
        games: winner.games,
      }),
    };

    const looserRequest = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: looser.name,
        age: looser.age,
        favFoods: looser.favFoods,
        loves: looser.loves,
        imgName: looser.imgName,
        wins: looser.wins,
        defeats: looser.defeats,
        games: looser.games,
      }),
    };

    try {
      await Promise.all([
        fetch(`/hamsters/${winnerHamsterId}`, winnerRequest),
        fetch(`/hamsters/${loosingHamsterId}`, looserRequest),
      ]);
      setVoted(true);

      if (winnerHamsterOne) {
        setHamsterOne({
          name: winner.name,
          age: winner.age,
          favFoods: winner.favFoods,
          loves: winner.loves,
          imgName: winner.imgName,
          wins: winner.wins,
          defeats: winner.defeats,
          games: winner.games,
        });
        setHamsterTwo({
          name: looser.name,
          age: looser.age,
          favFoods: looser.favFoods,
          loves: looser.loves,
          imgName: looser.imgName,
          wins: looser.wins,
          defeats: looser.defeats,
          games: looser.games,
        });
      } else {
        setHamsterTwo({
          name: winner.name,
          age: winner.age,
          favFoods: winner.favFoods,
          loves: winner.loves,
          imgName: winner.imgName,
          wins: winner.wins,
          defeats: winner.defeats,
          games: winner.games,
        });
        setHamsterOne({
          name: looser.name,
          age: looser.age,
          favFoods: looser.favFoods,
          loves: looser.loves,
          imgName: looser.imgName,
          wins: looser.wins,
          defeats: looser.defeats,
          games: looser.games,
        });
      }
    } catch {
      throw Error("Promise failed");
    }
  };

  return (
    <>
      {hamsterOne && hamsterTwo ? (
        <div className="battle-container setHamsterOne">
          <Card hamster={hamsterOne} vote={vote} voted={voted} />
          {voted ? (
            <button style={{ height: "50px" }}>
              <a href="/battle">Start New Match</a>
            </button>
          ) : (
            <div>VS</div>
          )}

          <Card hamster={hamsterTwo} vote={vote} voted={voted} />
        </div>
      ) : (
        <h3>Loading</h3>
      )}
    </>
  );
};

export default Battle;
