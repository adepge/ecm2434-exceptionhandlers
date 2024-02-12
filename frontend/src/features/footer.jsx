import React from "react";
import mapicon from "../assets/footer/map.svg";
import feedicon from "../assets/footer/feed.svg";
import topicon from "../assets/footer/top.svg";
import captureicon from "../assets/footer/capture.svg";

import "./stylesheets/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="button">
        <Link to="/">
          <div className="backdrop">
            <img src={mapicon} id="map-icon" alt="map-icon" />
          </div>
          <div className="footer-text">map</div>
        </Link>
      </div>
      <div className="button">
        <Link to="/feed">
          <div className="backdrop">
            <img src={feedicon} id="feed-icon" alt="feed-icon" />
          </div>
          <div className="footer-text">feed</div>
        </Link>
      </div>
      <div className="button">
        <Link to="/top">
          <div className="backdrop">
            <img src={topicon} id="top-icon" alt="top-icon" />
          </div>
          <div className="footer-text">top</div>
        </Link>
      </div>
      <div className="button">
        <div className="backdrop">
          <img src={captureicon} id="capture-icon" alt="capture-icon" />
        </div>
        <div className="footer-text">capture</div>
      </div>
    </footer>
  );
}
