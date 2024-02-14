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
  const columns = [leftPosts, rightPosts];

  //add the post to the left or right side depending if it's odd or even
  Object.entries(postMap).forEach(([index, image]) => {
    if (index % 2 == 0) {
      rightPosts[index] = image;
    } else {
      leftPosts[index] = image;
    }
  });

  return (
    <>
      <PostView
        isActive={activePost != 0}
        image={postMap[activePost]}
        leaveFunction={() => {
          setActive(0);
        }}
        likes={100}
        location={"Forum"}
        liked={false}
        userIcon={image1}
      />
      <div id="feed">
        <div id="top">
          <img
            src={image2}
            alt="image"
            style={{
              width: "100%",
              aspectRatio: "5/4",
              objectFit: "cover",
              border: "none",
              borderRadius: "10px",
            }}
            onClick={() => {
              setActive(4);
            }}
          />
        </div>
        <div id="daily-feed">
          <div id="title">
            Daily Feed<hr></hr>
          </div>
          <div id="grid-wrapper">
            {/* map each columns */}
            {columns.map((column, index) => (
              <div key={index} className={"image-grid " + index}>
                {/* map each posts in the column */}
                {Object.entries(column).map(([index, image]) => (
                  <div className="original">
                    <img
                      src={image}
                      alt="image"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setActive(index);
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPage;
