import "./stylesheets/interactives.css";
import HollowHeart from "../assets/heart-hollow.svg";
import Location from "../assets/location.svg";
import Share from "../assets/foward.svg";
import Heart from "../assets/heart.svg";
import { useState } from "react";
function Interactives({ likes, location, userIcon, liked, likeFunction }) {
  // volatile state for the like button
  const [vliked, vlikeFunction] = useState(liked);
  const [vlikes, vsetLikes] = useState(likes);

  // toggle the like button
  function toggleLike(event) {
    // prevent clicking the background when the like button is clicked from triggering the background click event
    event.stopPropagation();

    // update the like count and the like button
    if (vliked) {
      vsetLikes(vlikes - 1);
    } else {
      vsetLikes(vlikes + 1);
    }
    vlikeFunction(!vliked);
  }

  return (
    <div className="interactives">
      <div
        className="like element"
        onClick={(event) => {
          toggleLike(event);
        }}
      >
        <img
          src={vliked ? Heart : HollowHeart}
          height={"14px"}
          width={"14px"}
        />
        {vlikes}
      </div>
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
