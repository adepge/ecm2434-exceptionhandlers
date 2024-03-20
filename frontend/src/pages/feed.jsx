import React from "react";
import "./stylesheets/feed.css";
import { useState, useEffect } from "react";
import PostView from "../features/PostView";
import Polaroid from "../features/polaroid";
import axios from "axios";
import Cookies from "universal-cookie";
import CheckLogin from "../features/CheckLogin";
import InitMap from "../features/InitMap";
import { Link } from "react-router-dom";



const cookies = new Cookies();


function FeedPage() {

  // check if the user is logged in
  useEffect(() => {
    CheckLogin();
  }, []);

  const [activePost, setActive] = useState({});
  const [noPost, setNoPost] = useState(false);
  const [columns, setColumns] = useState([]);

  const [loadingImage, setLoadingImage] = useState(true);
  const [progress, setProgress] = useState(0);


  const [fetchedPosts, setFetchedPosts] = useState(false);

  // get all the post from database
  const getPosts = async () => {


    const token = cookies.get('token');

    try {
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/collectedPosts/",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`,
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
      alert("Cannot connect to the server");
    }
  };

  useEffect(() => {
    // Function to load an image and update its height in the state
    function getImageRatio(url) {
      // wait for the image to load
      return new Promise((resolve, reject) => {
        // create a new image
        const img = new Image();

        // when the image loads, resolve with the height
        img.onload = () => {
          resolve(img.height / img.width);
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
      if (postList.length === 0) {
        setNoPost(true);
      }
      setFetchedPosts(true);

      let heightDifference = 0;
      const rightPosts = [];
      const leftPosts = [];

      for (let i = 0; i < postList.length; i++) {

        const image = postList[i]["image"]


        // add rotation
        postList[i]["rotation"] = -2 + Math.random() * (2 + 2);

        // const imageRatio = await getImageRatio(image);

        // if the right column is shorter, add the image to the right column
        if (heightDifference < 0) {
          rightPosts[i] = postList[i];
          setColumns([leftPosts, rightPosts]);
          const imageRatio = await getImageRatio(image);
          heightDifference += imageRatio * 1.1; // 1.1% for the padding of the polaroid
        } else {
          leftPosts[i] = postList[i];
          setColumns([leftPosts, rightPosts]);
          const imageRatio = await getImageRatio(image);
          heightDifference -= imageRatio * 1.1; // 1.1% for the padding of the polaroid
        }
        setColumns([leftPosts, rightPosts]);
        // setProgress((i / postList.length) * 100);


      }

      setLoadingImage(false);

    };

    processImages();

  }, []);

  return (
    <>
      {/* the loading screen */}
      {/* {loadingImage && <InitMap progress={progress} />} */}
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

      {/* prompt the user to collect some posts if there is no post */}
      {(noPost) && (
        <div id="no-post" style={{ position: "fixed", zIndex: "9", width: "100%", height: "100vh" }}>
          <div style={{ position: "absolute", transform: "translate(-50%,-50%)", top: "50%", left: "50%", minWidth: "250px" }}>
            <div style={{ padding: "70px 0 ", color: "black", textAlign: "center", fontWeight: "700" }}>
              <div style={{ marginBottom: "10px" }}>You have no collected post yet
              </div>
              <Link to="/">
                <button id="button" style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "100px",
                  background: "var(--primary)",
                  fontWeight: "700",
                  fontSize: "16px",
                  fontFamily: "Outfit",
                }}>Go to collect</button>
              </Link>
            </div>

          </div >
        </div >
      )
      }

      {/* the feed */}
      {/* if there is no post or the post view is active, blur the feed */}
      <div id="feed" className={Object.keys(activePost).length !== 0}>
        <div id="padding">
          <div id="daily-feed">
            <div id="grid-wrapper">
              {((!fetchedPosts) || noPost) ? (
                <>
                  <div className={"image-grid "}>
                    <div className="polaroid skeleton shadow">
                      <div className="padding skeleton">
                        <div className="image skeleton" style={{ aspectRatio: 4 / 5 }}></div>
                      </div>
                    </div>
                    <div className="polaroid skeleton shadow">
                      <div className="padding skeleton">
                        <div className="image skeleton"></div>
                      </div>
                    </div>
                  </div>

                  <div className={"image-grid "}>
                    <div className="polaroid skeleton shadow">
                      <div className="padding skeleton">
                        <div className="image skeleton"></div>
                      </div>
                    </div>
                    <div className="polaroid skeleton shadow">
                      <div className="padding skeleton">
                        <div className="image skeleton" style={{ aspectRatio: 4 / 5 }}></div>
                      </div>
                    </div>
                  </div>
                </>

              ) : (
                // map the columns
                (columns.map((column, index) => (
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
                    {
                      loadingImage &&
                      <div className="polaroid skeleton shadow">
                        <div className="padding skeleton">
                          <div className="image skeleton"></div>
                        </div>
                      </div>
                    }
                  </div>
                )))
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default FeedPage;
