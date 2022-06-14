import "./Gallery.css";
import { useState, useEffect } from "react";

import GalleryCard from "./GalleryCard";
import NewHamster from "./NewHmaster";

const Gallery = (props) => {
  const [hamsters, setHamsters] = useState([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [updated, setListUpdated] = useState(false);

  useEffect(() => {
    const getHamsters = async () => {
      console.log("gethamsters");
      let hamstersData;

      const response = await fetch("hamsters");
      hamstersData = await response.json();
      console.log("hamstersData:", hamstersData);

      setHamsters(hamstersData);
      setListUpdated(false);
    };
    getHamsters();
  }, [updated]);

  const removeHamster = async (id) => {
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    await fetch(`/hamsters/${id}`, request);
    setListUpdated(true);
  };

  console.log("HEJEHFJER");

  return (
    <div className="gallery">
      {!showAddNew ? (
        <div className="grid">
          <div className="add-new" onClick={() => setShowAddNew(true)}>
            <h3>Add new hamster</h3>
            <p className="plus">+</p>
          </div>
          {hamsters.map((hamster) => (
            <div key={hamster.id}>
              <GalleryCard hamster={hamster} removeHamster={removeHamster} />
            </div>
          ))}
        </div>
      ) : (
        <NewHamster setShowAddNew={setShowAddNew} />
      )}
    </div>
  );
};

export default Gallery;
