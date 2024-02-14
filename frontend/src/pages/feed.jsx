import React from "react";
import "./stylesheets/feed.css";
import { useState } from "react";
import image1 from "../assets/feed/image1.png";
import image2 from "../assets/feed/image2.png";
import image3 from "../assets/feed/image3.png";
import image4 from "../assets/feed/image4.png";
import PostView from "../features/PostView";

function FeedPage() {
  const [activePost, setActive] = useState(0);

  const postMap = {
    1: image1,
    2: image2,
    3: image3,
    4: image4,
    5: image1,
    6: image2,
    7: image3,
  };

  const leftPosts = {};
  const rightPosts = {};

  //add the post to the left or right side depending if it's odd or even
  Object.entries(postMap).forEach(([index, image]) => {
    if (index % 2 == 0) {
      rightPosts[index] = image;
    } else {
      leftPosts[index] = image;
    }
  });

  //function to change the active post
  const changeActive = (index) => {
    setActive(index);
  };

  return (
    <div id="feed">
      <div id="top">
        <PostView
          image={image4}
          isActive={activePost == -1}
          onClick={() => changeActive(-1)}
          onLeave={() => changeActive(0)}
          aspectRatio={"5:4"}
        />
      </div>
      <div id="daily-feed">
        <div id="title">
          Daily Feed<hr></hr>
        </div>
        <div id="grid-wrapper">
          <div className="image-grid left">
            {Object.entries(leftPosts).map(([index, image]) => (
              <PostView
                className="daily-feed-post"
                key={index}
                image={image}
                isActive={activePost == index}
                onClick={() => changeActive(index)}
                onLeave={() => changeActive(0)}
              />
            ))}
          </div>
          <div className="image-grid right">
            {Object.entries(rightPosts).map(([index, image]) => (
              <PostView
                className="daily-feed-post"
                key={index}
                image={image}
                isActive={activePost == index}
                onClick={() => changeActive(index)}
                onLeave={() => changeActive(0)}
              />
            ))}
          </div>
        </div>
      </div>

      <div id="footer-spacing" style={{ height: "60px" }} />
    </div>
  );
}

export default FeedPage;
