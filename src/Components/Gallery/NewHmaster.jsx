import { useState } from "react";
import "./NewHamster.css";

const NewHamster = ({ setShowAddNew, setUpdateData }) => {
  const [newHamster, setNewHamster] = useState({
    name: "",
    age: "",
    imgName: "",
    loves: "",
    favFood: "",
    games: 0,
    defeats: 0,
    wins: 0,
  });

  const [addSucceded, setAddSucceded] = useState(false);

  const [nameTouched, setNameTouched] = useState(false);
  const [ageTouched, setAgeTouched] = useState(false);
  const [imgTouched, setImgTouched] = useState(false);
  const [lovesTouched, setLovesTouched] = useState(false);
  const [foodTouched, setFoodTouched] = useState(false);

  const [allValid, setAllValid] = useState(true);

  const checkValid = () => {
    if (validName && validAge && validImg && validLoves && validFood) {
      return true;
    }
    return false;
  };

  let validName = true;
  let nameMessage = "";
  if (newHamster.name === "") {
    validName = false;
    nameMessage = "Please add your hamsters name!";
  }

  let validAge = true;
  let ageMessage = "";
  const numbers = /^[0-9]+$/;
  if (newHamster.age === "") {
    validAge = false;
    ageMessage = "Please add your hamsters age!";
  } else if (!newHamster.age.match(numbers)) {
    validAge = false;
    ageMessage = "Only use numbers!";
  }

  let validImg = true;
  let imgMessage = "";
  const url = /\.(jpeg|jpg|gif|png)$/;
  if (newHamster.imgName === "") {
    validImg = false;
    imgMessage = "Please add a image URL";
  } else if (!newHamster.imgName.match(url)) {
    validImg = false;
    imgMessage = "URL must end with .jpeg .jpg .png or .gif";
  }

  let validLoves = true;
  let lovesMessage = "";
  if (newHamster.loves === "") {
    validLoves = false;
    lovesMessage = "Please add what your hamster loves to do!";
  }

  let validFood = true;
  let foodMessage = "";
  if (newHamster.favFood === "") {
    validFood = false;
    foodMessage = "Please add your hamsters favorite food!";
  }

  const setHamster = (key, value) => {
    const hamster = { ...newHamster };
    hamster[key] = value;
    setNewHamster(hamster);
  };

  const addHamster = async () => {
    const check = checkValid();
    if (check) {
      const hamsterToAdd = { ...newHamster };
      hamsterToAdd.age = Number(newHamster.age);

      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hamsterToAdd),
      };

      try {
        const response = await fetch("hamsters", request);
        if (response.status === 200) {
          setAddSucceded(true);
          setUpdateData(Date.now());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAllValid(false);
    }
  };

  return (
    <div className="new-hamster">
      <section className="lightbox">
        {!addSucceded ? (
          <>
            <h3>Add new hamster</h3>
            <div className="form">
              <label>
                Name:
                <input
                  type="text"
                  onChange={(event) => {
                    setHamster("name", event.target.value);
                  }}
                  value={newHamster.name}
                  onFocus={() => {
                    setNameTouched(false);
                    setAllValid(true);
                  }}
                  onBlur={() => setNameTouched(true)}
                />
              </label>
              {nameTouched ? <p className="msg"> {nameMessage} </p> : ""}

              <label>
                Age:
                <input
                  type="text"
                  onChange={(event) => {
                    setHamster("age", event.target.value);
                  }}
                  value={newHamster.age}
                  onFocus={() => {
                    setAgeTouched(false);
                    setAllValid(true);
                  }}
                  onBlur={() => setAgeTouched(true)}
                />
              </label>
              {ageTouched ? <p className="msg"> {ageMessage} </p> : ""}

              <label>
                Image URL:
                <input
                  type="text"
                  onChange={(event) => {
                    setHamster("imgName", event.target.value);
                  }}
                  value={newHamster.imgName}
                  onFocus={() => {
                    setImgTouched(false);
                    setAllValid(true);
                  }}
                  onBlur={() => setImgTouched(true)}
                />
              </label>
              {imgTouched ? <p className="msg"> {imgMessage} </p> : ""}

              <label>
                Loves to:
                <input
                  type="text"
                  onChange={(event) => {
                    setHamster("loves", event.target.value);
                  }}
                  value={newHamster.loves}
                  onFocus={() => {
                    setLovesTouched(false);
                    setAllValid(true);
                  }}
                  onBlur={() => setLovesTouched(true)}
                />
              </label>
              {lovesTouched ? <p className="msg"> {lovesMessage} </p> : ""}

              <label>
                Favorite food:
                <input
                  type="text"
                  onChange={(event) => {
                    setHamster("favFood", event.target.value);
                  }}
                  value={newHamster.favFood}
                  onFocus={() => {
                    setFoodTouched(false);
                    setAllValid(true);
                  }}
                  onBlur={() => setFoodTouched(true)}
                />
              </label>
              {foodTouched ? <p className="msg"> {foodMessage} </p> : ""}
            </div>
            {!allValid ? (
              <p className="correct">
                Please fill out all the fields correctly!
              </p>
            ) : (
              <div onClick={() => addHamster()}>
                <button className="blue-btn">Add</button>
              </div>
            )}
          </>
        ) : (
          <>
            <h3>Welcome {newHamster.name}!</h3>
            <p>Your hamster is now added to Hamsterwars.</p>
            <p>Good Luck!</p>

            <div className="ok-btn">
              <button className="blue-btn">
                <a href="/gallery">OK</a>
              </button>
            </div>
          </>
        )}
        <p className="close" onClick={() => setShowAddNew(false)}>
          x
        </p>
      </section>
    </div>
  );
};

export default NewHamster;
