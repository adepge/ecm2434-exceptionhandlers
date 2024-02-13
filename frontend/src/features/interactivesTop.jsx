import "./stylesheets/interactives.css";
import exit from "../assets/exit.svg";

function InteractivesTop() {
  return (
    <div className="interactives" style={{ flexDirection: "row-reverse" }}>
      <img src={exit} />
    </div>
  );
}

export default InteractivesTop;
