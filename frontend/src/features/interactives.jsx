import "./stylesheets/interactives.css";
import HollowHeart from "../assets/heart-hollow.svg";
import Location from "../assets/location.svg";
import Share from "../assets/foward.svg";
import Heart from "../assets/heart.svg";
import { useEffect, useState } from "react";
function Interactives({ likes, location, userIcon, liked, likeFunction, isActive }) {
  // volatile state for the like button
  const [vliked, vlikeFunction] = useState(liked);
  const [vlikes, vsetLikes] = useState(likes);

  // refresh likes every time the prop changes
  useEffect(() => {
    vlikeFunction(liked);
    vsetLikes(likes);
  }, [isActive]);

  // toggle the like button
  function toggleLike(event) {
    // prevent clicking the background when the like button is clicked from triggering the background click event
    event.stopPropagation();
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
          <div className={vliked? "icon-inner active": "icon-inner"}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="s-ion-icon"><path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"></path></svg></div>
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
