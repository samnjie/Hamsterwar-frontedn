import "./Card.css";

function Card(props) {
  return (
    <div className="card-container">
      <div className="image-container">
        Här är det tänkt att bilden ska komma
      </div>

      <div className="card-title">
        <h3> {props.title} </h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </p>
      </div>
      <div className="btn">
        <button>
          <a>Vote!</a>
        </button>
      </div>
    </div>
  );
}

export default Card;
