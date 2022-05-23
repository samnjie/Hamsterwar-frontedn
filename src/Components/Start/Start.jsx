import { Link } from "react-router-dom";
import "./Start.css";
import Rulse from "./Rules";
function Start() {
  return (
    <div className="home-class">
      <Rulse />
      <div className="battle-button">
        <Link to="/battle"> Start Battle </Link>
      </div>
    </div>
  );
}

export default Start;
