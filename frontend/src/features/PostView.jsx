import React, { useState } from "react";
import "./stylesheets/postView.css";

import Interactives from "../features/interactives";
import InteractivesTop from "../features/interactivesTop";

function PostView({ image, isActive, onClick, onLeave }) {
  return (
    <div>
      <div className="original">
        <img
          src={image}
          alt="image"
          onClick={onClick}
          style={{ width: "100%" }}
        />
      </div>
      <div
        className={isActive ? "display active" : "display"}
        onClick={onLeave}
      >
        <div className="post-wrapper">
          <InteractivesTop />
          <img src={image} alt="image" style={{ width: "100%" }} />
          <Interactives />
          <div className="footer-margin" style={{ height: "50px" }} />
        </div>
      </div>
    </div>
  );
}

export default PostView;
