// a loading screen that will be displayed when the app is loading

import React from "react";
import "./stylesheets/loadingScreen.css";

function LoadingScreen({ active }) {
  return (
    <div
      className="loading-screen"
      style={active ? { display: "block" } : { display: "none" }}
    >
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingScreen;
