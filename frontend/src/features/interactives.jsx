import "./stylesheets/interactives.css";
import HollowHeart from "../assets/heart-hollow.svg";
import Location from "../assets/location.svg";
import Share from "../assets/foward.svg";
function Interactives() {
  return (
    <div className="interactives">
      <div className="like element">
        <img src={HollowHeart} />
        23
      </div>
      <div className="location element">
        <img src={Location} />
        Forum
      </div>
      <div className="share element">
        <img src={Share} />
      </div>
    </div>
  );
}

export default Interactives;
