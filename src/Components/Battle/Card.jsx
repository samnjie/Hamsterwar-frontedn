import "./Card.css";

function Card(props) {
  const { hamster, vote, voted } = props;

  const imgSrc = "/img/" + hamster.imgName;

  return (
    <div className="card-container">
      <div className="image-container">
        <img src={imgSrc} alt={imgSrc} className="card-image" />
      </div>

      <div className="card-title">
        <h3> {hamster.name} </h3>
        <p>Age : {hamster.age}</p>
        <p>Favourite food : {hamster.favFood}</p>
        <p>Loves : {hamster.loves}</p>
      </div>

      {!voted ? (
        <div className="btn">
          <button onClick={() => vote(hamster.id)}>
            <a>Vote!</a>
          </button>
        </div>
      ) : (
        <div className="btn">
          <button>Wins : {hamster.wins}</button>
          <button>Defeats : {hamster.defeats}</button>
        </div>
      )}
    </div>
  );
}

export default Card;
