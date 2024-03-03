import React from "react";
import "./stylesheets/feed.css";
import { useState, useEffect } from "react";
import PostView from "../features/PostView";
import Polaroid from "../features/polaroid";
import { set } from "date-fns";
import axios from "axios";
import Cookies from "universal-cookie";
import CheckLogin from "../features/CheckLogin";



const cookies = new Cookies();


function FeedPage() {

  // check if the user is logged in
  CheckLogin();

  const [activePost, setActive] = useState({});
  const [columns, setColumns] = useState([]);

  // get all the post from database
  const getPosts = async () => {


    const token = cookies.get('token');

    try {
      // Update the API URL as per your configuration
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/collectedPosts/",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`, // Assuming postData.username is the token
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

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
    // Also randomize the rotation of the images
    const processImages = async (e) => {

      const postList = await getPosts();

      let heightDifference = 0;
      const rightPosts = [];
      const leftPosts = [];

      for (let i = 0; i < postList.length; i++) {

        postList[i]["image"] = "https://api.post-i-tivity.me/" + postList[i]["image"]
        const image = postList[i]["image"];

        // add rotation
        postList[i]["rotation"] = -2 + Math.random() * (2 + 2);

        const imageHeight = await getImageHeight(image);

        // if the right column is shorter, add the image to the right column
        if (heightDifference < 0) {
          rightPosts[i] = postList[i];
          heightDifference += imageHeight + 10; //10 for the margin
        } else {
          leftPosts[i] = postList[i];
          heightDifference -= imageHeight + 10; //10 for the margin
        }
        setColumns([leftPosts, rightPosts]);
      }

    };

    processImages();

  }, []);

  return (
    <>
      {/* the absolute position post view */}
      <PostView
        isActive={Object.keys(activePost).length !== 0}
        image={activePost["image"]}
        leaveFunction={() => {
          setActive({});
        }}
        caption={activePost["caption"]}
        location={"Forum"}
        showBottomBar={false}
      />

      {/* the feed */}
      <div id="feed">
        <div id="daily-feed">
          <div id="grid-wrapper">
            {/* map each columns */}
            {columns.map((column, index) => (
              <div key={index} className={"image-grid " + index}>
                {/* map each posts in the column */}
                {column.map((post) => (
                  <div className={post["id"]} key={post["id"]}>
                    <Polaroid
                      src={post["image"]}
                      func={() => {
                        setActive(post);
                      }}
                      caption={post["caption"]}
                      rotation={post["rotation"]}
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
