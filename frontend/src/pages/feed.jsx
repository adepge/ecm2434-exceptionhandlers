import React from "react";
import "./stylesheets/feed.css";
import { useState } from "react";
import image1 from "../assets/feed/image1.png";
import image2 from "../assets/feed/image2.png";
import image3 from "../assets/feed/image3.png";
import image4 from "../assets/feed/image4.png";

function FeedPage() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div id="feed">
      <div id="top">
        <img
          src={image4}
          alt="image1"
          onClick={toggleClass}
          className={isActive ? "active" : null}
        />
        <div className="interactives">
          <div className="like">like</div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
