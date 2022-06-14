// import star from "../../media/star.svg";
import React, { useState } from "react";

const GalleryCard = ({ hamster, removeHamster }) => {
  const [style, setStyle] = useState({ display: "none" });

  const imgSrc = "/img/" + hamster.imgName;
  const imgAlt = hamster.name + " picture";
  return (
    <div
      className="gallery-card"
      onMouseEnter={(e) => {
        setStyle({ display: "block" });
      }}
      onMouseLeave={(e) => {
        setStyle({ display: "none" });
      }}
    >
      <h3>{hamster.name}</h3>
      <hr className="under" />

      <img src={imgSrc} alt={imgAlt} className="hamster-pic" />
      <div style={style} className="more-info">
        <p>Age : {hamster.age}</p>
        <p>Favourite food : {hamster.favFood}</p>
        <p>Loves : {hamster.loves}</p>
        <p>Wins : {hamster.wins}</p>
        <p>Defeats : {hamster.defeats}</p>

        <button onClick={() => removeHamster(hamster.id)}>
          Remove Hmaster
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;
