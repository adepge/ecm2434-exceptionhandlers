import React from "react";
import mapicon from "../assets/footer/map.svg";
import feedicon from "../assets/footer/feed.svg";
import topicon from "../assets/footer/top.svg";
import captureicon from "../assets/footer/capture.svg";

import "./stylesheets/footer.css";

export default function Footer() {
  return (
    <footer>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={mapicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">map</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={feedicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">feed</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={topicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">top</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={captureicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">capture</div>
      </div>
    </footer>
  );
}
