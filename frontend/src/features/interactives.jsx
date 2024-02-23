/* the interactives component is a child component of the card component. It contains the location and share icons. */
import "./stylesheets/interactives.css";

import Location from "../assets/location.svg";
import Share from "../assets/foward.svg";

function Interactives({ location, userIcon }) {
  return (
    <div className="interactives">
      <div className="location element">
        <img src={Location} />
        {location}
      </div>
      <div className="share element">
        <img src={Share} />
      </div>
    </div>
  );
}

export default Interactives;
