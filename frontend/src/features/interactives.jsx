import "./stylesheets/interactives.css";
import HollowHeart from "../assets/heart-hollow.svg";
import Location from "../assets/location.svg";
import Share from "../assets/foward.svg";
import Heart from "../assets/heart.svg";
import { useEffect, useState } from "react";
function Interactives({ location, userIcon, isActive }) {
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
