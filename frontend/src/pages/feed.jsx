import React from "react";
import "./stylesheets/feed.css";
import { useState, useEffect } from "react";
import PostView from "../features/PostView";
import Polaroid from "../features/polaroid";

const image1 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297022160978/1000016508.JPG?ex=65dfdc7d&is=65cd677d&hm=295b9625886c4e12ea212d291878bb71d37e22a31d71e5757546d0a4a0a1bdb4&";
const image2 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297961943050/1000015958.JPG?ex=65dfdc7e&is=65cd677e&hm=6413142376bf1efe664ef897cd70325b1f5f2d03e9d177ab4b9c541a5fb1de59&";
const image3 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497298116874311/1000016354.JPG?ex=65dfdc7e&is=65cd677e&hm=e497673ab0de533871fc5fb4bb6e702ce4fbaa856f99461dc3abf555c6f0d510&";

function FeedPage() {
  const [activePost, setActive] = useState(0);
  const [postMap, setPostMap] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Function to load an image and update its height in the state

    setPostMap(() => ({
      1: image1,
      2: image2,
      3: image3,
      4: image1,
      5: image1,
      6: image2,
      7: image3,
      8: image2,
      9: image2,
      10: image3,
      11: image1,
      12: image3,
      13: image1,
      14: image2,
      15: image3,

      16: image1,
      17: image2,
      18: image3,
      19: image1,
      20: image1,
      21: image2,

      22: image3,
      23: image1,
    }));
  }, []);

  useEffect(() => {
    // Function to load an image and update its height in the state
    function getImageHeight(url) {
      // wait for the image to load
      return new Promise((resolve, reject) => {
        // create a new image
        const img = new Image();

        // when the image loads, resolve with the height
        img.onload = () => {
          resolve(img.height);
        };

        // if there is an error, reject with the error
        img.onerror = reject;
        img.src = url;
      });
    }

    // Distribute the images into two columns based on which column is shorter
    const processImages = async (postMap) => {
      let heightDifference = 0;
      const rightPosts = {};
      const leftPosts = {};

      for (const [index, image] of Object.entries(postMap)) {
        // Wait for the image height
        const imageHeight = await getImageHeight(image);
        // if the right column is shorter, add the image to the right column
        if (heightDifference < 0) {
          rightPosts[index] = image;
          heightDifference += imageHeight + 10; //10 for the margin
        } else {
          leftPosts[index] = image;
          heightDifference -= imageHeight + 10; //10 for the margin
        }
        setColumns([leftPosts, rightPosts]);
      }
    };

    processImages(postMap);
  }, [postMap]);

  return (
    <>
      {/* the absolute position post view */}
      <PostView
        isActive={activePost != 0}
        image={postMap[activePost]}
        leaveFunction={() => {
          setActive(0);
        }}
        location={"Forum"}
        userIcon={image1}
      />

      {/* the feed */}
      <div id="feed">
        <div id="daily-feed">
          <div id="grid-wrapper">
            {/* map each columns */}
            {columns.map((column, index) => (
              <div key={index} className={"image-grid " + index}>
                {/* map each posts in the column */}
                {Object.entries(column).map(([index, image]) => (
                  <div className={index} key={index}>
                    <Polaroid
                      src={image}
                      func={() => {
                        setActive(index);
                      }}
                      rotation={-2 + Math.random() * (2 + 2)}
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
